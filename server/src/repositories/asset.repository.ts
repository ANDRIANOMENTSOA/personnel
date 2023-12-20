import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Asset, AssetRelations} from '../models';

export class AssetRepository extends DefaultCrudRepository<
  Asset,
  typeof Asset.prototype.id,
  AssetRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(Asset, dataSource);
  }
}
