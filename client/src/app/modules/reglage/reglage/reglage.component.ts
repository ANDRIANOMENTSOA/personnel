import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from 'src/app/core/services/asset.service';
import { ReglageService } from 'src/app/core/services/reglage.service';

@Component({
  selector: 'app-reglage',
  templateUrl: './reglage.component.html',
  styleUrls: ['./reglage.component.scss'],
})
export class ReglageComponent implements OnInit {
  formReglage = this.reglageService.form();
  formMiseAjour = this.reglageService.formMiseAjour();
  constructor(
    private reglageService: ReglageService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private assetService: AssetService
  ) {}

  edit = false;
  reglageId = '';
  titleForm = 'reglage.nouveaux';
  base64file: string | undefined;

  ngOnInit(): void {
    this.reglageService.find().subscribe(
      (reglage) => {
        if (reglage.length > 0) {
          this.edit = true;
          this.titleForm = 'reglage.modifier';
          this.reglageId = reglage[0].id;
          this.formReglage = this.reglageService.form(reglage[0]);
        }
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.toastr.error(this.translate.instant('general.problemeServeur'));
      }
    );
  }

  SaveReglage() {
    const reglage = this.formReglage.value;
    if (this.edit) {
      this.reglageService.updateById(this.reglageId, reglage).subscribe(() => {
        this.toastr.success(this.translate.instant('action.enregistree'));
        this.ngOnInit();
      });
    } else {
      this.reglageService.create(reglage).subscribe((res) => {
        this.formReglage = this.reglageService.form(res);
        this.toastr.success(this.translate.instant('action.enregistree'));
        this.ngOnInit();
      });
    }
  }

  getFileId(fileId: string) {
    this.formReglage.get('model_conge')?.setValue(fileId);
  }

  telechargeModel() {
    this.assetService.telechargeFichier(
      this.formReglage.get('model_conge')?.value
    );
  }

  miseAjourConge() {
    this.reglageService
      .miseAjourConge(this.formMiseAjour.get('soldePlus')?.value)
      .subscribe(() => {
        this.formMiseAjour.get('soldePlus')?.setValue(0);
        this.toastr.success(this.translate.instant('action.enregistree'));
      });
  }
}
