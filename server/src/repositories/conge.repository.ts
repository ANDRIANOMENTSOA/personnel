import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { MainDataSource } from '../datasources';
import { Conge, CongeRelations, Personnel, Asset} from '../models';
import {PersonnelRepository} from './personnel.repository';
import {AssetRepository} from './asset.repository';

export class CongeRepository extends DefaultCrudRepository<
  Conge,
  typeof Conge.prototype.id,
  CongeRelations
> {

  public readonly personnel: BelongsToAccessor<Personnel, typeof Conge.prototype.id>;

  public readonly asset: BelongsToAccessor<Asset, typeof Conge.prototype.id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('PersonnelRepository') protected personnelRepositoryGetter: Getter<PersonnelRepository>, @repository.getter('AssetRepository') protected assetRepositoryGetter: Getter<AssetRepository>,
  ) {
    super(Conge, dataSource);
    this.asset = this.createBelongsToAccessorFor('asset', assetRepositoryGetter,);
    this.registerInclusionResolver('asset', this.asset.inclusionResolver);
    this.personnel = this.createBelongsToAccessorFor('personnel', personnelRepositoryGetter,);
    this.registerInclusionResolver('personnel', this.personnel.inclusionResolver);
  }
}
