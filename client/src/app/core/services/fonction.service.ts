import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Fonction } from '../interfaces/fonction';
import { GenericCrudService } from './generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class FonctionService extends GenericCrudService<Fonction> {
  rootPath = 'fonctions/';

  constructor(protected http: HttpClient) {
    super();
  }

  form(fonction?: Fonction) {
    return new UntypedFormGroup({
      nom: new UntypedFormControl(fonction ? fonction.nom : '', Validators.required),
    });
  }
}
