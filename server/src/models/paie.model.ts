import {model, property} from '@loopback/repository';
import {GenericModel} from './generic-model.model';

@model()
export class Paie extends GenericModel {
  @property({
    type: 'string',
    required: true,
  })
  mois: string;

  constructor(data?: Partial<Paie>) {
    super(data);
  }
}

export interface PaieRelations {
  // describe navigational properties here
}

export type PaieWithRelations = Paie & PaieRelations;
