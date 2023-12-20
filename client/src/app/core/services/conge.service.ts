import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Conge } from '../interfaces/conge';
import { GenericCrudService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class CongeService extends GenericCrudService<Conge> {
  rootPath = 'conges/';

  constructor(protected http: HttpClient) {
    super();
  }

  form(conge?: Conge) {
    return new UntypedFormGroup({
      date_debut: new UntypedFormControl(
        conge ? conge.date_debut : '',
        Validators.required
      ),
      date_fin: new UntypedFormControl(
        conge ? conge.date_fin : '',
        Validators.required
      ),
      resposable_informe: new UntypedFormControl(
        conge ? conge.resposable_informe : true,
        Validators.required
      ),
      statut: new UntypedFormControl(
        conge ? conge.statut : 'conge.EnAttente',
        Validators.required
      ),
      personnelId: new UntypedFormControl(
        conge ? conge.personnelId : sessionStorage.getItem('id'),
        Validators.required
      ),
    });
  }

  congeAccept(id: string) {
    return this.http.post(
      this.rootPath + id + '/accept/' + sessionStorage.getItem('id'),
      {}
    );
  }

  congeRefuser(id: string) {
    return this.http.post<void>(
      this.rootPath + id + '/refuser/' + sessionStorage.getItem('id'),
      {}
    );
  }
}
