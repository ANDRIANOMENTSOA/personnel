import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {PersonnelCredential, PersonnelCredentialRelations} from '../models';

export class PersonnelCredentialRepository extends DefaultCrudRepository<
  PersonnelCredential,
  typeof PersonnelCredential.prototype.id,
  PersonnelCredentialRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(PersonnelCredential, dataSource);
  }
}
