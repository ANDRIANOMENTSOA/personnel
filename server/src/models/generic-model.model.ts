import { Entity, model, property } from '@loopback/repository';
import { generate } from 'short-uuid';

@model()
export class GenericModel extends Entity {
  @property({
    type: 'string',
    id: true,
    default: generate
  })
  id: string;

  @property({
    type: 'date',
    default: new Date()
  })
  createdAt: Date;

  @property({
    type: 'date',
    default: new Date()
  })
  updatedAt: Date;


  constructor(data?: Partial<GenericModel>) {
    super(data);
  }
}

export interface GenericModelRelations {
  // describe navigational properties here
}

export type GenericModelWithRelations = GenericModel & GenericModelRelations;
