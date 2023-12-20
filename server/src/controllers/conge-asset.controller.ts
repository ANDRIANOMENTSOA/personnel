import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Conge, Asset} from '../models';
import {CongeRepository} from '../repositories';

@authenticate('jwt')
export class CongeAssetController {
  constructor(
    @repository(CongeRepository)
    public congeRepository: CongeRepository,
  ) {}

  @get('/conges/{id}/asset', {
    responses: {
      '200': {
        description: 'Asset belonging to Conge',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asset)},
          },
        },
      },
    },
  })
  async getAsset(
    @param.path.string('id') id: typeof Conge.prototype.id,
  ): Promise<Asset> {
    return this.congeRepository.asset(id);
  }
}
