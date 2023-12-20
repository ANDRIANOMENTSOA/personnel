import {
  model,
  property,
  hasOne,
  belongsTo,
  hasMany,
} from '@loopback/repository';
import {GenericModel} from './generic-model.model';
import {Fonction} from './fonction.model';
import {Conge} from './conge.model';
import {Asset} from './asset.model';

@model()
export class Personnel extends GenericModel {
  @property({
    type: 'string',
    required: true,
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
  })
  prenom: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  telephone?: string;

  @property({
    type: 'string',
  })
  situation_familiale?: string;

  @property({
    type: 'date',
  })
  date_naissance?: Date;

  @property({
    type: 'string',
  })
  genre?: string;

  @property({
    type: 'string',
    dataType: 'TEXT',
  })
  info_complementaire?: string;

  @property({
    type: 'string',
    dataType: 'TEXT',
    required: true,
  })
  description_mission: string;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  direction?: boolean;

  @property({
    type: 'number',
    required: false,
  })
  soldeConge?: number;

  @belongsTo(() => Fonction)
  fonctionId: string;

  @hasMany(() => Conge)
  conges: Conge[];

  @belongsTo(() => Asset)
  assetId: string;

  @belongsTo(() => Asset)
  signatureAssetId?: string;

  constructor(data?: Partial<Personnel>) {
    super(data);
  }
}

export interface PersonnelRelations {
  // describe navigational properties here
}

export type PersonnelWithRelations = Personnel & PersonnelRelations;
