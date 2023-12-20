import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import { MainDataSource } from '../datasources';
import { Personnel, PersonnelRelations, Fonction, Conge, Asset} from '../models';
import { FonctionRepository } from './fonction.repository';
import {CongeRepository} from './conge.repository';
import {AssetRepository} from './asset.repository';

export class PersonnelRepository extends DefaultCrudRepository<
  Personnel,
  typeof Personnel.prototype.id,
  PersonnelRelations
> {

  public readonly fonction: BelongsToAccessor<Fonction, typeof Personnel.prototype.id>;

  public readonly conges: HasManyRepositoryFactory<Conge, typeof Personnel.prototype.id>;

  public readonly asset: BelongsToAccessor<Asset, typeof Personnel.prototype.id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('FonctionRepository') protected fonctionRepositoryGetter: Getter<FonctionRepository>, @repository.getter('CongeRepository') protected congeRepositoryGetter: Getter<CongeRepository>, @repository.getter('AssetRepository') protected assetRepositoryGetter: Getter<AssetRepository>,
  ) {
    super(Personnel, dataSource);
    this.asset = this.createBelongsToAccessorFor('asset', assetRepositoryGetter,);
    this.registerInclusionResolver('asset', this.asset.inclusionResolver);
    this.conges = this.createHasManyRepositoryFactoryFor('conges', congeRepositoryGetter,);
    this.registerInclusionResolver('conges', this.conges.inclusionResolver);
    this.fonction = this.createBelongsToAccessorFor('fonction', fonctionRepositoryGetter,);
    this.registerInclusionResolver('fonction', this.fonction.inclusionResolver);
  }
}
