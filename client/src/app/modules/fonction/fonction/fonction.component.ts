import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Fonction } from 'src/app/core/interfaces/fonction';
import { FonctionService } from 'src/app/core/services/fonction.service';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss'],
})
export class FonctionComponent implements OnInit {
  constructor(
    private fonctionService: FonctionService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public currentRoute: ActivatedRoute,
    public router: Router
  ) {}

  formFonction: UntypedFormGroup = this.fonctionService.form();
  titleForm = 'fonction.nouveaux';
  editId = '';
  refrechId = '';

  ngOnInit(): void {
    this.currentRoute.params.subscribe((param) => {
      this.editId = param['id'];
      if (this.editId) {
        this.titleForm = 'fonction.modifier';
        this.fonctionService.findById(this.editId).subscribe((fonction) => {
          this.formFonction = this.fonctionService.form(fonction);
        });
      }
    });
  }

  SaveFonction(): void {
    const fonction: Fonction = this.formFonction.value;
    if (this.editId) {
      this.fonctionService.updateById(this.editId, fonction).subscribe(
        () => {
          this.toastr.success(this.translateText('action.enregistree'));
          this.router.navigate(['fonction']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(this.translateText(err.error.error.message));
        }
      );
    } else {
      this.fonctionService.create(fonction).subscribe(
        (res) => {
          this.formFonction.reset();
          this.toastr.success(this.translateText('action.enregistree'));
          this.refrechId = res.id;
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(this.translateText(err.error.error.message));
        }
      );
    }
  }

  translateText(text: string): string {
    return this.translate.instant(text);
  }
}
