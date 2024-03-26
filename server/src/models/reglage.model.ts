import {model, property} from '@loopback/repository';
import {GenericModel} from './generic-model.model';

@model()
export class Reglage extends GenericModel {
  @property({
    type: 'string',
    required: true,
  })
  nom_societe: string;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'string',
    required: true,
  })
  model_conge: string;

  @property({
    type: 'string',
    required: true,
  })
  model_paie: string;

  constructor(data?: Partial<Reglage>) {
    super(data);
  }
}

export interface ReglageRelations {
  // describe navigational properties here
}

export type ReglageWithRelations = Reglage & ReglageRelations;
