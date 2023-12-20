import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Conge } from 'src/app/core/interfaces/conge';
import { CongeService } from 'src/app/core/services/conge.service';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.scss'],
})
export class DemandeCongeComponent implements OnInit {
  constructor(
    private congeService: CongeService,
    private toastr: ToastrService,
    public translate: TranslateService,
    public currentRoute: ActivatedRoute,
    public router: Router
  ) {}

  formConge: UntypedFormGroup = this.congeService.form();
  titleForm = 'conge.nouveaux';
  editId = '';
  refrechId = '';
  personnelId = sessionStorage.getItem('id');

  ngOnInit(): void {
    this.currentRoute.params.subscribe((param) => {
      this.editId = param['id'];
      if (this.editId) {
        this.titleForm = 'conge.modifier';
        this.congeService.findById(this.editId).subscribe((conge) => {
          this.formConge = this.congeService.form(conge);
        });
      }
    });
  }

  SaveConge(): void {
    const conge: Conge = this.formConge.value;
    if (this.editId) {
      this.congeService.updateById(this.editId, conge).subscribe(
        () => {
          this.toastr.success(this.translateText('action.enregistree'));
          this.router.navigate(['conge']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(this.translateText(err.error.error.message));
        }
      );
    } else {
      this.congeService.create(conge).subscribe(
        (res) => {
          this.formConge.reset();
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
