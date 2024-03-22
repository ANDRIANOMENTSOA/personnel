import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UntypedFormBuilder,
  FormControl,
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
      nom: new FormControl(personnel ? personnel.nom : '', Validators.required),
      prenom: new FormControl(
        personnel ? personnel.prenom : '',
        Validators.required
      ),
      email: new FormControl(personnel ? personnel.email : '', [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl(
        personnel ? personnel.address : '',
        Validators.required
      ),
      telephone: new FormControl(
        personnel ? personnel.telephone : '',
        Validators.required
      ),
      situation_familiale: new FormControl(
        personnel ? personnel.situation_familiale : '',
        Validators.required
      ),
      date_naissance: new FormControl(
        personnel ? personnel.date_naissance : '',
        Validators.required
      ),
      genre: new FormControl(
        personnel ? personnel.genre : '',
        Validators.required
      ),
      info_complementaire: new FormControl(
        personnel ? personnel.info_complementaire : ''
      ),
      description_mission: new FormControl(
        personnel ? personnel.description_mission : '',
        Validators.required
      ),
      fonctionId: new FormControl(
        personnel ? personnel.fonctionId : '',
        Validators.required
      ),
      direction: new FormControl(personnel ? personnel.direction : false),
      soldeConge: new FormControl(
        personnel ? personnel.soldeConge : 0,
        Validators.required
      ),
      assetId: new FormControl(personnel ? personnel.assetId : null),
    });
  }

  getFormSignature(signature?: any) {
    return this.fb.group({
      type: [signature ? signature.type : 'image', Validators.required],
    });
  }
}
