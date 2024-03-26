import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Paie, PaieRelations} from '../models';

export class PaieRepository extends DefaultCrudRepository<
  Paie,
  typeof Paie.prototype.id,
  PaieRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(Paie, dataSource);
  }
}
