import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Conge, Personnel} from '../models';
import {CongeRepository} from '../repositories';

@authenticate('jwt')
export class CongePersonnelController {
  constructor(
    @repository(CongeRepository)
    public congeRepository: CongeRepository,
  ) {}

  @get('/conges/{id}/personnel', {
    responses: {
      '200': {
        description: 'Personnel belonging to Conge',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personnel)},
          },
        },
      },
    },
  })
  async getPersonnel(
    @param.path.string('id') id: typeof Conge.prototype.id,
  ): Promise<Personnel> {
    return this.congeRepository.personnel(id);
  }
}
