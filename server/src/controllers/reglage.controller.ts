import {authenticate} from '@loopback/authentication';
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
import {Reglage} from '../models';
import {PersonnelRepository, ReglageRepository} from '../repositories';

@authenticate('jwt')
export class ReglageController {
  constructor(
    @repository(ReglageRepository)
    public reglageRepository: ReglageRepository,
    @repository(PersonnelRepository)
    public personnelRepository: PersonnelRepository,
  ) {}

  @post('/reglages')
  @response(200, {
    description: 'Reglage model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reglage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reglage, {
            title: 'NewReglage',
            exclude: ['id'],
          }),
        },
      },
    })
    reglage: Omit<Reglage, 'id'>,
  ): Promise<Reglage> {
    return this.reglageRepository.create(reglage);
  }

  @get('/reglages/count')
  @response(200, {
    description: 'Reglage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Reglage) where?: Where<Reglage>): Promise<Count> {
    return this.reglageRepository.count(where);
  }

  @get('/reglages')
  @response(200, {
    description: 'Array of Reglage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reglage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reglage) filter?: Filter<Reglage>,
  ): Promise<Reglage[]> {
    return this.reglageRepository.find(filter);
  }

  @patch('/reglages')
  @response(200, {
    description: 'Reglage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reglage, {partial: true}),
        },
      },
    })
    reglage: Reglage,
    @param.where(Reglage) where?: Where<Reglage>,
  ): Promise<Count> {
    return this.reglageRepository.updateAll(reglage, where);
  }

  @get('/reglages/{id}')
  @response(200, {
    description: 'Reglage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reglage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reglage, {exclude: 'where'})
    filter?: FilterExcludingWhere<Reglage>,
  ): Promise<Reglage> {
    return this.reglageRepository.findById(id, filter);
  }

  @patch('/reglages/{id}')
  @response(204, {
    description: 'Reglage PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reglage, {partial: true}),
        },
      },
    })
    reglage: Reglage,
  ): Promise<void> {
    await this.reglageRepository.updateById(id, reglage);
  }

  @put('/reglages/{id}')
  @response(204, {
    description: 'Reglage PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reglage: Reglage,
  ): Promise<void> {
    await this.reglageRepository.replaceById(id, reglage);
  }

  @del('/reglages/{id}')
  @response(204, {
    description: 'Reglage DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reglageRepository.deleteById(id);
  }

  @post('/reglages/{soldePlus}/update')
  @response(200, {
    description: 'Update solde conge',
    content: {'application/json': {schema: getModelSchemaRef(Reglage)}},
  })
  async updateSoldeConge(
    @param.path.string('soldePlus') soldePlus: number,
  ): Promise<void> {
    const personnels = await this.personnelRepository.find();
    for (const personnel of personnels) {
      //@ts-ignore
      const soldeAdditional = +personnel.soldeConge + +soldePlus;
      await this.personnelRepository.updateById(personnel.id, {
        soldeConge: soldeAdditional,
      });
    }
  }
}
