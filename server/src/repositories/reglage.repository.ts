import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Reglage, ReglageRelations} from '../models';

export class ReglageRepository extends DefaultCrudRepository<
  Reglage,
  typeof Reglage.prototype.id,
  ReglageRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(Reglage, dataSource);
  }
}
