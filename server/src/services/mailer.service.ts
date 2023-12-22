import {injectable, BindingScope} from '@loopback/core';
import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import {Personnel} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class MailerService {
  transport: Mail;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'dev.ergosante@gmail.com',
        pass: 'gnmwtuznhhyayenj',
      },
    });
    this.transport.verify(function (error, success) {
      if (error) {
        console.error('nodemailer error', error);
      }
    });
  }

  async sendMail(mail: Mail.Options) {
    /*await this.transport.sendMail({
      from: '"Ergomada" <dev.ergosante@gmail.com>',
      to: 'j.andria@ergosante.fr',
      subject: 'Hello', // Subject line
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    });*/
    await this.transport.sendMail(mail);
  }

  /*envoiMailPersonnel(personnel: Personnel) {
    const mail = {
      from: 'Ergomada',
      to: personnel.email,
      subject: 'Bienvenue chez ergomada',
      text: 'Compte Ergomada crée',
      html: `
      <h2>${personnel.nom + ' ' + personnel.prenom},</h2>
      <p>Votre compte chez ergomada a été créé!</p>
      <p style="text-align: center"><a href="https://ergomada.herokuapp.com/connexion/reset/${
        personnel.id
      }">Créer un mot de passe</a></p>
      <p>Cliquez le lien ci-dessus pour créer votre mot de passe.</p>
      <p></p>
      <p><i> -- L'équipe Ergomada.</i></p>
      `,
    };
    this.sendMail(mail);
  }*/
  envoiMailPersonnel(personnel: Personnel) {
    const mail = {
      from: 'Ergomada',
      to: personnel.email,
      subject: 'Bienvenue chez ergomada',
      text: 'Compte Ergomada crée',
      html: `
      <h2>${personnel.nom + ' ' + personnel.prenom},</h2>
      <p>Votre compte chez ergomada a été créé!</p>
      <p style="text-align: center"><a href="https://ergomada.ajadi.mg/connexion/reset/${
        personnel.id
      }">Créer un mot de passe</a></p>
      <p>Cliquez le lien ci-dessus pour créer votre mot de passe.</p>
      <p></p>
      <p><i> -- L'équipe Ergomada.</i></p>
      `,
    };
    this.sendMail(mail);
  }
}
