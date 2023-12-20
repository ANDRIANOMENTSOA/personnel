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
import {Personnel, Conge} from '../models';
import {PersonnelRepository} from '../repositories';

@authenticate('jwt')
export class PersonnelCongeController {
  constructor(
    @repository(PersonnelRepository)
    protected personnelRepository: PersonnelRepository,
  ) {}

  @get('/personnel/{id}/conges', {
    responses: {
      '200': {
        description: 'Array of Personnel has many Conge',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conge)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Conge>,
  ): Promise<Conge[]> {
    return this.personnelRepository.conges(id).find(filter);
  }

  @post('/personnel/{id}/conges', {
    responses: {
      '200': {
        description: 'Personnel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conge)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Personnel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conge, {
            title: 'NewCongeInPersonnel',
            exclude: ['id'],
            optional: ['personnelId'],
          }),
        },
      },
    })
    conge: Omit<Conge, 'id'>,
  ): Promise<Conge> {
    return this.personnelRepository.conges(id).create(conge);
  }

  @patch('/personnel/{id}/conges', {
    responses: {
      '200': {
        description: 'Personnel.Conge PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conge, {partial: true}),
        },
      },
    })
    conge: Partial<Conge>,
    @param.query.object('where', getWhereSchemaFor(Conge)) where?: Where<Conge>,
  ): Promise<Count> {
    return this.personnelRepository.conges(id).patch(conge, where);
  }

  @del('/personnel/{id}/conges', {
    responses: {
      '200': {
        description: 'Personnel.Conge DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Conge)) where?: Where<Conge>,
  ): Promise<Count> {
    return this.personnelRepository.conges(id).delete(where);
  }
}
