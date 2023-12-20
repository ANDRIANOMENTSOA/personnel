import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Personnel, Asset} from '../models';
import {PersonnelRepository} from '../repositories';

@authenticate('jwt')
export class PersonnelAssetController {
  constructor(
    @repository(PersonnelRepository)
    public personnelRepository: PersonnelRepository,
  ) {}

  @get('/personnel/{id}/asset', {
    responses: {
      '200': {
        description: 'Asset belonging to Personnel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asset)},
          },
        },
      },
    },
  })
  async getAsset(
    @param.path.string('id') id: typeof Personnel.prototype.id,
  ): Promise<Asset> {
    return this.personnelRepository.asset(id);
  }
}
