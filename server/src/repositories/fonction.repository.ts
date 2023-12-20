import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { MainDataSource } from '../datasources';
import { Fonction, FonctionRelations, Personnel } from '../models';
import { PersonnelRepository } from './personnel.repository';

export class FonctionRepository extends DefaultCrudRepository<
  Fonction,
  typeof Fonction.prototype.id,
  FonctionRelations
> {

  public readonly personnel: HasManyRepositoryFactory<Personnel, typeof Fonction.prototype.id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('PersonnelRepository') protected personnelRepositoryGetter: Getter<PersonnelRepository>,
  ) {
    super(Fonction, dataSource);
    this.personnel = this.createHasManyRepositoryFactoryFor('personnel', personnelRepositoryGetter,);
    this.registerInclusionResolver('personnel', this.personnel.inclusionResolver);
  }
}
