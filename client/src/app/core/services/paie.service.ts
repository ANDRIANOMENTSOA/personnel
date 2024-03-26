import { Injectable } from '@angular/core';
import { Paie } from '../interfaces/paie';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from './generic-crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PaieService extends GenericCrudService<Paie> {
  rootPath = 'paies/';

  constructor(protected http: HttpClient) {
    super();
  }

  form(paie?: Paie) {
    return new FormGroup({
      mois: new FormControl(paie ? paie.mois : '', Validators.required),
    });
  }
}
