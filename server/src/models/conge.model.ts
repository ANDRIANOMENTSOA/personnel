import { model, property, belongsTo } from '@loopback/repository';
import { GenericModel } from './generic-model.model';
import { Personnel } from './personnel.model';
import {Asset} from './asset.model';

@model()
export class Conge extends GenericModel {
  @property({
    type: 'date',
    required: true,
  })
  date_debut: Date;

  @property({
    type: 'date',
    required: true,
  })
  date_fin: Date;

  @property({
    type: 'boolean',
    required: true,
  })
  resposable_informe: boolean;

  @property({
    type: 'string',
    required: true,
  })
  statut: string;

  @belongsTo(() => Personnel)
  personnelId: string;

  @belongsTo(() => Asset)
  assetId: string;

  constructor(data?: Partial<Conge>) {
    super(data);
  }
}

export interface CongeRelations {
  // describe navigational properties here
}

export type CongeWithRelations = Conge & CongeRelations;
