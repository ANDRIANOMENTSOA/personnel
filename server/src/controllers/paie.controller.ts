import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Paie} from '../models';
import {PaieRepository} from '../repositories';

export class PaieController {
  constructor(
    @repository(PaieRepository)
    public paieRepository : PaieRepository,
  ) {}

  @post('/paies')
  @response(200, {
    description: 'Paie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Paie)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paie, {
            title: 'NewPaie',
            exclude: ['id'],
          }),
        },
      },
    })
    paie: Omit<Paie, 'id'>,
  ): Promise<Paie> {
    return this.paieRepository.create(paie);
  }

  @get('/paies/count')
  @response(200, {
    description: 'Paie model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Paie) where?: Where<Paie>,
  ): Promise<Count> {
    return this.paieRepository.count(where);
  }

  @get('/paies')
  @response(200, {
    description: 'Array of Paie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Paie, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Paie) filter?: Filter<Paie>,
  ): Promise<Paie[]> {
    return this.paieRepository.find(filter);
  }

  @patch('/paies')
  @response(200, {
    description: 'Paie PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paie, {partial: true}),
        },
      },
    })
    paie: Paie,
    @param.where(Paie) where?: Where<Paie>,
  ): Promise<Count> {
    return this.paieRepository.updateAll(paie, where);
  }

  @get('/paies/{id}')
  @response(200, {
    description: 'Paie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Paie, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Paie, {exclude: 'where'}) filter?: FilterExcludingWhere<Paie>
  ): Promise<Paie> {
    return this.paieRepository.findById(id, filter);
  }

  @patch('/paies/{id}')
  @response(204, {
    description: 'Paie PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Paie, {partial: true}),
        },
      },
    })
    paie: Paie,
  ): Promise<void> {
    await this.paieRepository.updateById(id, paie);
  }

  @put('/paies/{id}')
  @response(204, {
    description: 'Paie PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paie: Paie,
  ): Promise<void> {
    await this.paieRepository.replaceById(id, paie);
  }

  @del('/paies/{id}')
  @response(204, {
    description: 'Paie DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paieRepository.deleteById(id);
  }
}
