import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Reglage } from '../interfaces/reglage';
import { GenericCrudService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class ReglageService extends GenericCrudService<Reglage> {
  rootPath = 'reglages/';
  constructor(protected http: HttpClient) {
    super();
  }

  form(reglage?: Reglage) {
    return new UntypedFormGroup({
      nom_societe: new UntypedFormControl(
        reglage ? reglage.nom_societe : '',
        Validators.required
      ),
      model_conge: new UntypedFormControl(
        reglage ? reglage.model_conge : '',
        Validators.required
      ),
      logo: new UntypedFormControl(reglage ? reglage.logo : ''),
    });
  }

  formMiseAjour() {
    return new UntypedFormGroup({
      soldePlus: new UntypedFormControl(0, Validators.required),
    });
  }

  miseAjourConge(soldePlus: number) {
    return this.http.post<void>(this.rootPath + soldePlus + '/update/', {});
  }
}
