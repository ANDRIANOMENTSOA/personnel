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
  HttpErrors,
} from '@loopback/rest';
import {Fonction} from '../models';
import {FonctionRepository, PersonnelRepository} from '../repositories';

@authenticate('jwt')
export class FonctionController {
  constructor(
    @repository(FonctionRepository)
    public fonctionRepository: FonctionRepository,
    @repository(PersonnelRepository)
    public personnelRepository: PersonnelRepository,
  ) {}

  @post('/fonctions')
  @response(200, {
    description: 'Fonction model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fonction)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fonction, {
            title: 'NewFonction',
            exclude: ['id'],
          }),
        },
      },
    })
    fonction: Omit<Fonction, 'id'>,
  ): Promise<Fonction> {
    const existFonction = await this.fonctionRepository.findOne({
      where: {nom: fonction.nom},
    });
    if (existFonction) {
      throw new HttpErrors.Conflict('fonction.existe');
    }
    return this.fonctionRepository.create(fonction);
  }

  @get('/fonctions/count')
  @response(200, {
    description: 'Fonction model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Fonction) where?: Where<Fonction>): Promise<Count> {
    return this.fonctionRepository.count(where);
  }

  @get('/fonctions')
  @response(200, {
    description: 'Array of Fonction model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fonction, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fonction) filter?: Filter<Fonction>,
  ): Promise<Fonction[]> {
    return this.fonctionRepository.find(filter);
  }

  @patch('/fonctions')
  @response(200, {
    description: 'Fonction PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fonction, {partial: true}),
        },
      },
    })
    fonction: Fonction,
    @param.where(Fonction) where?: Where<Fonction>,
  ): Promise<Count> {
    return this.fonctionRepository.updateAll(fonction, where);
  }

  @get('/fonctions/{id}')
  @response(200, {
    description: 'Fonction model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fonction, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Fonction, {exclude: 'where'})
    filter?: FilterExcludingWhere<Fonction>,
  ): Promise<Fonction> {
    return this.fonctionRepository.findById(id, filter);
  }

  @patch('/fonctions/{id}')
  @response(204, {
    description: 'Fonction PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fonction, {partial: true}),
        },
      },
    })
    fonction: Fonction,
  ): Promise<void> {
    await this.fonctionRepository.updateById(id, fonction);
  }

  @put('/fonctions/{id}')
  @response(204, {
    description: 'Fonction PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fonction: Fonction,
  ): Promise<void> {
    await this.fonctionRepository.replaceById(id, fonction);
  }

  @del('/fonctions/{id}')
  @response(204, {
    description: 'Fonction DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    const fonctionUtiliser = await this.personnelRepository.findOne({
      where: {fonctionId: id},
    });
    if (fonctionUtiliser) {
      throw new HttpErrors.Conflict('fonction.utiliser');
    }
    await this.fonctionRepository.deleteById(id);
  }
}
