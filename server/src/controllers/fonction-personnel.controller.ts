import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Fonction, Personnel} from '../models';
import {FonctionRepository} from '../repositories';

@authenticate('jwt')
export class FonctionPersonnelController {
  constructor(
    @repository(FonctionRepository)
    protected fonctionRepository: FonctionRepository,
  ) {}

  @get('/fonctions/{id}/personnel', {
    responses: {
      '200': {
        description: 'Array of Fonction has many Personnel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personnel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Personnel>,
  ): Promise<Personnel[]> {
    return this.fonctionRepository.personnel(id).find(filter);
  }

  @post('/fonctions/{id}/personnel', {
    responses: {
      '200': {
        description: 'Fonction model instance',
        content: {'application/json': {schema: getModelSchemaRef(Personnel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Fonction.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personnel, {
            title: 'NewPersonnelInFonction',
            exclude: ['id'],
            optional: ['fonctionId'],
          }),
        },
      },
    })
    personnel: Omit<Personnel, 'id'>,
  ): Promise<Personnel> {
    return this.fonctionRepository.personnel(id).create(personnel);
  }

  @patch('/fonctions/{id}/personnel', {
    responses: {
      '200': {
        description: 'Fonction.Personnel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Personnel, {partial: true}),
        },
      },
    })
    personnel: Partial<Personnel>,
    @param.query.object('where', getWhereSchemaFor(Personnel))
    where?: Where<Personnel>,
  ): Promise<Count> {
    return this.fonctionRepository.personnel(id).patch(personnel, where);
  }

  @del('/fonctions/{id}/personnel', {
    responses: {
      '200': {
        description: 'Fonction.Personnel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Personnel))
    where?: Where<Personnel>,
  ): Promise<Count> {
    return this.fonctionRepository.personnel(id).delete(where);
  }
}
