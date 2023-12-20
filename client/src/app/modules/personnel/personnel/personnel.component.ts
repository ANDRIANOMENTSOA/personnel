import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Personnel } from 'src/app/core/interfaces/personnel';
import { FonctionService } from 'src/app/core/services/fonction.service';
import { PersonnelService } from 'src/app/core/services/personnel.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
})
export class PersonnelComponent implements OnInit {
  formPersonnel = this.personnelService.form();

  titleForm = 'personnel.nouveaux';
  editId = '';
  refrechId = '';

  fonction = this.fonctionService.find();

  genres = [
    {
      key: 'Homme',
      value: 'Homme',
    },
    {
      key: 'Femme',
      value: 'Femme',
    },
  ];

  situationFamiliales = [
    {
      key: 'Célibataire',
      value: 'Célibataire',
    },
    {
      key: 'Marié',
      value: 'Marié',
    },
  ];

  constructor(
    private personnelService: PersonnelService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public currentRoute: ActivatedRoute,
    public router: Router,
    private fonctionService: FonctionService
  ) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe((param) => {
      this.editId = param['id'];
      if (this.editId) {
        this.titleForm = 'personnel.modifier';
        this.personnelService.findById(this.editId).subscribe((personnel) => {
          this.formPersonnel = this.personnelService.form(personnel);
        });
      }
    });
  }

  savePersonnel() {
    const personnel: Personnel = this.formPersonnel.value;
    if (this.editId) {
      this.personnelService.updateById(this.editId, personnel).subscribe(
        () => {
          this.toastr.success(this.translateText('action.enregistree'));
          this.router.navigate(['personnel']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(this.translateText(err.error.error.message));
        }
      );
    } else {
      this.personnelService.create(personnel).subscribe(
        (res) => {
          this.formPersonnel.reset();
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
