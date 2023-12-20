import { model, property } from '@loopback/repository';
import { GenericModel } from './generic-model.model';

@model()
export class PersonnelCredential extends GenericModel {
  @property({
    type: 'string',
    required: true,
  })
  hash: string;

  @property({
    type: 'string',
    required: true,
  })
  personnelId: string;


  constructor(data?: Partial<PersonnelCredential>) {
    super(data);
  }
}

export interface PersonnelCredentialRelations {
  // describe navigational properties here
}

export type PersonnelCredentialWithRelations = PersonnelCredential & PersonnelCredentialRelations;
