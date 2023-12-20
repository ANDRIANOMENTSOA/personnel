import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import * as fs from 'fs';
import mime from 'mime-types';
import {Attachment} from 'nodemailer/lib/mailer';
import {PDFDocument} from 'pdf-lib';
import {Personnel, PersonnelRelations} from '../models';
import {
  AssetRepository,
  CongeRepository,
  PersonnelRepository,
} from '../repositories';
import {FileStorageService} from './file-storage.service';
import {MailerService} from './mailer.service';

@injectable({scope: BindingScope.TRANSIENT})
export class CongeService {
  constructor(
    @repository(CongeRepository) private congeRepository: CongeRepository,
    @repository(PersonnelRepository)
    private personnelRepository: PersonnelRepository,
    @service(FileStorageService)
    public fileStorage: FileStorageService,
    @service(MailerService)
    public mailer: MailerService,
    @repository(AssetRepository)
    public assetRepository: AssetRepository,
  ) {}

  async genererPdfConge(idConge: string, idValidateur?: string) {
    const conge = await this.congeRepository.findById(idConge);
    const personnel = await this.personnelRepository.findById(
      conge.personnelId,
      {include: [{relation: 'fonction'}]},
    );
    // creation conge pdf
    const file = await this.fileStorage.getFile(conge.assetId);
    const pdfDoc = await PDFDocument.load(file);
    const form = pdfDoc.getForm();
    form.getTextField('datedemande').setText(this.formatDate(new Date()));
    form.getTextField('typeConge').setText(' X');
    form.getTextField('typePersmission').setText('');
    form
      .getTextField('nom_prenom')
      .setText(personnel.nom + ' ' + personnel.prenom);
    form.getTextField('email').setText(personnel.email);
    form.getTextField('telephone').setText(personnel.telephone);
    form
      .getTextField('dateDebut')
      .setText(' ' + this.formatDate(new Date(conge.date_debut)));
    const congePris = this.nbJour(
      new Date(conge.date_debut),
      new Date(conge.date_fin),
    );
    form
      .getTextField('dateFin')
      .setText(' ' + this.formatDate(new Date(conge.date_fin)));
    form.getTextField('nbConge').setText(' ' + congePris.toString());
    form
      .getTextField('clientInforme')
      .setText(conge.resposable_informe ? '   X' : '');
    if (!conge.resposable_informe) {
      form.getTextField('clientInformeNon').setText('   X');
    }
    form.getTextField('fonction').setText((personnel as any).fonction.nom);

    // accepter
    form
      .getTextField('accepte')
      .setText(conge.statut === 'conge.Accepte' ? '   X' : '');
    // refuser
    form
      .getTextField('refuse')
      .setText(conge.statut === 'conge.Refuse' ? '   X' : '');

    // signature demandeur
    if (personnel.signatureAssetId) {
      const signature = await this.fileStorage.getFile(
        personnel.signatureAssetId,
      );
      const emblemImage = await this.embedSignature(pdfDoc, signature);
      form.getButton('demandeur').setImage(emblemImage);
    } else {
      // signature par default
      form
        .getButton('demandeur')
        .setImage(await this.signatureParDefaul(pdfDoc));
    }

    // signature Direction
    if (idValidateur) {
      const direction = await this.personnelRepository.findById(idValidateur);
      if (direction.signatureAssetId) {
        const signatureDirection = await this.fileStorage.getFile(
          direction.signatureAssetId,
        );
        const emblemImage = await this.embedSignature(
          pdfDoc,
          signatureDirection,
        );
        form.getButton('direction').setImage(emblemImage);
      } else {
        // signature par default
        form
          .getButton('direction')
          .setImage(await this.signatureParDefaul(pdfDoc));
      }
      form.flatten();
    }

    fs.writeFileSync(
      this.fileStorage.getFilePath(conge.assetId),
      await pdfDoc.save(),
    );
    this.sendMailConge(conge.assetId, personnel);
  }

  async updateSoldeConge(idPersonnel: string, congePris: number) {
    const personnel = await this.personnelRepository.findById(idPersonnel);
    if (personnel.soldeConge) {
      const resteConge = personnel.soldeConge - congePris;
      await this.personnelRepository.updateById(idPersonnel, {
        soldeConge: resteConge,
      });
    }
  }

  async sendMailConge(
    idAssetConge: string,
    personnel: Personnel & PersonnelRelations,
  ) {
    const file = await this.getAttachment(
      idAssetConge,
      'Demande Congé ' + personnel.nom + ' ' + personnel.prenom,
    );
    const attachments: Attachment[] = [];
    attachments.push(file);
    const mailAdministration = (await this.personnelRepository.find({
      where: {direction: true},
    })).map(personnel => personnel.email);
    const mail = {
      from: 'Ergomada',
      to: ['josephaimeandry@gmail.com', ...mailAdministration],
      subject: 'Demande Conge',
      text: 'Conge',
      html: `
      <h2>${personnel.nom + ' ' + personnel.prenom},</h2>
      Bonjour, veuillez trouver ci-joint ma demande de congé. Merci

     <p>Cordialement<p>.
      `,
      attachments: attachments,
    };
    await this.mailer.sendMail(mail);
  }

  async notificationConge(
    idAssetConge: string,
    personnelId: string,
    idValidateur: string,
    reponse: string,
  ) {
    const personnel = await this.personnelRepository.findById(personnelId);
    const validateur = await this.personnelRepository.findById(idValidateur);
    const file = await this.getAttachment(
      idAssetConge,
      'Réponse Congé ' + personnel.nom + ' ' + personnel.prenom,
    );
    const attachments: Attachment[] = [];
    attachments.push(file);
    const mail = {
      from: 'Ergomada',
      to: personnel.email,
      subject: 'Réponse Congé',
      text: 'Conge',
      html: `
      <h2>Bonjour ${personnel.nom + ' ' + personnel.prenom},</h2>
      Votre demande de congé a été ${reponse} par ${validateur.nom +
        ' ' +
        validateur.prenom}

     <p>Cordialement<p>.
      `,
      attachments: attachments,
    };
    await this.mailer.sendMail(mail);
  }

  async getAttachment(assetId: string, filename = 'Demande') {
    const asset = await this.assetRepository.findById(assetId);
    if (asset.contentType) {
      return {
        content: await this.fileStorage.getFile(assetId),
        contentType: asset.contentType,
        filename: filename + '.' + mime.extension(asset.contentType),
      };
    }
    return {
      content: await this.fileStorage.getFile(assetId),
      filename: filename,
    };
  }

  embedSignature(pdfDoc: PDFDocument, signature: Buffer) {
    let emblemImage;
    try {
      emblemImage = pdfDoc.embedPng(signature);
    } catch (error) {
      emblemImage = pdfDoc.embedJpg(signature);
    }
    return emblemImage;
  }

  async signatureParDefaul(pdfDoc: PDFDocument) {
    return pdfDoc.embedPng(fs.readFileSync('signature.PNG'));
  }

  formatDate(inputDate: Date) {
    let date, month, year;
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
    date = date.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');
    return `${date}/${month}/${year}`;
  }

  nbJour(start: Date, end: Date) {
    const diff = end.getTime() - start.getTime();
    return diff / (1000 * 3600 * 24);
  }

  public basicTest() {
    return 5;
  }
}
