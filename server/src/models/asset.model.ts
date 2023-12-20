import { model, property } from '@loopback/repository';
import { GenericModel } from './generic-model.model';

@model()
export class Asset extends GenericModel {
  @property({
    type: 'string',
  })
  contentType?: string;

  @property({
    type: 'number',
  })
  size?: number;


  constructor(data?: Partial<Asset>) {
    super(data);
  }
}

export interface AssetRelations {
  // describe navigational properties here
}

export type AssetWithRelations = Asset & AssetRelations;
