import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from 'src/app/core/services/asset.service';
import { PersonnelService } from 'src/app/core/services/personnel.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
  id!: string;
  formSigntaure!: UntypedFormGroup;
  // Signature
  @ViewChild('fileUploadSignature')
  fileUploadSignature!: ElementRef;
  linkSignatureImage!: string | undefined;

  // Draw signtaure
  drawSignature = true;

  constructor(
    public dialogRef: MatDialogRef<SignatureComponent>,
    public personnelService: PersonnelService,
    public assetService: AssetService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.formSigntaure = this.personnelService.getFormSignature({
      type: 'draw',
    });
  }

  SaveSignature(data: any) {
    const files = this.dataURItoBlob(data, 'signature.png');
    this.updateSignature(files);
  }

  updateSignature(files: any) {
    this.assetService.upload(files).subscribe((asset) => {
      const personnel = {
        id: this.id,
        signatureAssetId: asset[0].id,
      };
      this.personnelService.update(personnel).subscribe(() => {
        this.linkSignatureImage = this.assetService.assetUrl(asset[0].id);
        this.toastr.success(this.translate.instant('signature.saved'));
        const url = this.assetService.assetUrl(asset[0].id);
        this.dialogRef.close(url);
      });
    });
  }

  NoSignature() {
    this.linkSignatureImage = undefined;
  }

  uploadSignature() {
    this.fileUploadSignature.nativeElement.click();
  }

  onSignatureSelected(event: any) {
    const files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    if (this.assetService.checkImage(files[0].type)) {
      this.updateSignature(files[0]);
    } else {
      this.assetService.errorImage();
    }
  }

  changeType(event: MatRadioChange) {
    this.drawSignature = event.value === 'draw';
  }

  dataURItoBlob(dataURI: any, fileName: string): File {
    // convert base64/URLEncoded data component to a file
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ia], fileName, { type: mimeString });
  }
}
