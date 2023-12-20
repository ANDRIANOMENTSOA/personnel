import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Personnel, Fonction} from '../models';
import {PersonnelRepository} from '../repositories';

@authenticate('jwt')
export class PersonnelFonctionController {
  constructor(
    @repository(PersonnelRepository)
    public personnelRepository: PersonnelRepository,
  ) {}

  @get('/personnel/{id}/fonction', {
    responses: {
      '200': {
        description: 'Fonction belonging to Personnel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Fonction)},
          },
        },
      },
    },
  })
  async getFonction(
    @param.path.string('id') id: typeof Personnel.prototype.id,
  ): Promise<Fonction> {
    return this.personnelRepository.fonction(id);
  }
}
