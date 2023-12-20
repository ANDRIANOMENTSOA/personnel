import { model, property, hasMany } from '@loopback/repository';
import { GenericModel } from './generic-model.model';
import { Personnel } from './personnel.model';

@model()
export class Fonction extends GenericModel {
  @property({
    type: 'string',
    required: true,
  })
  nom: string;

  @hasMany(() => Personnel)
  personnel: Personnel[];

  constructor(data?: Partial<Fonction>) {
    super(data);
  }
}

export interface FonctionRelations {
  // describe navigational properties here
}

export type FonctionWithRelations = Fonction & FonctionRelations;
