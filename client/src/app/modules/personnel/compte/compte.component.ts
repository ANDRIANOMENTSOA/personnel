import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Personnel } from 'src/app/core/interfaces/personnel';
import { AssetService } from 'src/app/core/services/asset.service';
import { PersonnelService } from 'src/app/core/services/personnel.service';
import { SignatureComponent } from '../signature/signature.component';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss'],
})
export class CompteComponent implements OnInit {
  constructor(
    private personnelService: PersonnelService,
    public dialog: MatDialog,
    private assetService: AssetService
  ) {}
  linkSignatureImage: string | undefined;

  compte!: Personnel;
  showAvatar = false;

  ngOnInit(): void {
    const id = sessionStorage.getItem('id') ?? '';
    this.personnelService
      .findById(id, { include: [{ relation: 'fonction' }] })
      .subscribe((compte) => {
        this.compte = compte;
        this.showAvatar = true;
        this.linkSignatureImage = this.assetService.assetUrl(
          this.compte.signatureAssetId ?? ''
        );
      });
  }

  DialogSignature() {
    const dialogRef = this.dialog.open(SignatureComponent, {
      disableClose: false,
    });
    const instance = dialogRef.componentInstance;
    instance.id = sessionStorage.getItem('id') ?? '';
    instance.linkSignatureImage = this.assetService.assetUrl(
      this.compte.signatureAssetId ?? ''
    );
    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (!result) {
        return;
      }
      this.linkSignatureImage = result;
      this.ngOnInit();
    });
  }

  NoSignature() {
    this.linkSignatureImage = undefined;
  }
}
