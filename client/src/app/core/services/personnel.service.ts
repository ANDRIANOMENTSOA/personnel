import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Personnel } from '../interfaces/personnel';
import { GenericCrudService } from './generic-crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonnelService extends GenericCrudService<Personnel> {
  rootPath = 'personnel/';
  constructor(protected http: HttpClient, private fb: UntypedFormBuilder) {
    super();
  }

  idPersonnel = sessionStorage.getItem('id');
  currentUser: Observable<Personnel> = this.findById(
    this.idPersonnel as string
  );

  form(personnel?: Personnel) {
    return new UntypedFormGroup({
      nom: new UntypedFormControl(
        personnel ? personnel.nom : '',
        Validators.required
      ),
      prenom: new UntypedFormControl(
        personnel ? personnel.prenom : '',
        Validators.required
      ),
      email: new UntypedFormControl(personnel ? personnel.email : '', [
        Validators.required,
        Validators.email,
      ]),
      address: new UntypedFormControl(
        personnel ? personnel.address : '',
        Validators.required
      ),
      telephone: new UntypedFormControl(
        personnel ? personnel.telephone : '',
        Validators.required
      ),
      situation_familiale: new UntypedFormControl(
        personnel ? personnel.situation_familiale : '',
        Validators.required
      ),
      date_naissance: new UntypedFormControl(
        personnel ? personnel.date_naissance : '',
        Validators.required
      ),
      genre: new UntypedFormControl(
        personnel ? personnel.genre : '',
        Validators.required
      ),
      info_complementaire: new UntypedFormControl(
        personnel ? personnel.info_complementaire : ''
      ),
      description_mission: new UntypedFormControl(
        personnel ? personnel.description_mission : '',
        Validators.required
      ),
      fonctionId: new UntypedFormControl(
        personnel ? personnel.fonctionId : '',
        Validators.required
      ),
      direction: new UntypedFormControl(
        personnel ? personnel.direction : false
      ),
      soldeConge: new UntypedFormControl(
        personnel ? personnel.soldeConge : 0,
        Validators.required
      ),
    });
  }

  getFormSignature(signature?: any) {
    return this.fb.group({
      type: [signature ? signature.type : 'image', Validators.required],
    });
  }
}
