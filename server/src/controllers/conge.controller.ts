import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Conge} from '../models';
import {AssetRepository, CongeRepository, ReglageRepository} from '../repositories';
import {CongeService, FileStorageService} from '../services';

@authenticate('jwt')
export class CongeController {
  constructor(
    @repository(CongeRepository)
    public congeRepository: CongeRepository,
    @repository(ReglageRepository)
    public reglageRepository: ReglageRepository,
    @repository(AssetRepository)
    public assetRepository: AssetRepository,
    @service(FileStorageService)
    public fileStorage: FileStorageService,
    @service(CongeService) private congeService: CongeService,
  ) {}

  @post('/conges')
  @response(200, {
    description: 'Conge model instance',
    content: {'application/json': {schema: getModelSchemaRef(Conge)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conge, {
            title: 'NewConge',
            exclude: ['id'],
          }),
        },
      },
    })
    conge: Omit<Conge, 'id'>,
  ): Promise<Conge> {
    const reglage = await this.reglageRepository.findOne();
    if (!reglage?.model_conge) {
      throw new HttpErrors.Conflict('conge.AucunModelConge');
    }
    const model = await this.assetRepository.findById(reglage.model_conge);
    //@ts-ignore
    delete model.id;
    const newAssetConge = await this.assetRepository.create(model);
    if (newAssetConge.id) {
      await this.fileStorage.copyFile(reglage.model_conge, newAssetConge.id);
    }
    conge.assetId = newAssetConge.id;
    const newConge = await this.congeRepository.create(conge);
    await this.congeService.genererPdfConge(newConge.id);
    return newConge;
  }

  @get('/conges/count')
  @response(200, {
    description: 'Conge model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Conge) where?: Where<Conge>): Promise<Count> {
    return this.congeRepository.count(where);
  }

  @get('/conges')
  @response(200, {
    description: 'Array of Conge model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conge, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Conge) filter?: Filter<Conge>): Promise<Conge[]> {
    return this.congeRepository.find(filter);
  }

  @patch('/conges')
  @response(200, {
    description: 'Conge PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conge, {partial: true}),
        },
      },
    })
    conge: Conge,
    @param.where(Conge) where?: Where<Conge>,
  ): Promise<Count> {
    return this.congeRepository.updateAll(conge, where);
  }

  @get('/conges/{id}')
  @response(200, {
    description: 'Conge model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conge, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Conge, {exclude: 'where'})
    filter?: FilterExcludingWhere<Conge>,
  ): Promise<Conge> {
    return this.congeRepository.findById(id, filter);
  }

  @patch('/conges/{id}')
  @response(204, {
    description: 'Conge PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conge, {partial: true}),
        },
      },
    })
    conge: Conge,
  ): Promise<void> {
    await this.congeRepository.updateById(id, conge);
    await this.congeService.genererPdfConge(id);
  }

  @put('/conges/{id}')
  @response(204, {
    description: 'Conge PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() conge: Conge,
  ): Promise<void> {
    await this.congeRepository.replaceById(id, conge);
  }

  @del('/conges/{id}')
  @response(204, {
    description: 'Conge DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.congeRepository.deleteById(id);
  }

  @post('/conges/{id}/accept/{par}')
  @response(204, {
    description: 'conges accept success',
  })
  async acceptConge(
    @param.path.string('id') id: string,
    @param.path.string('par') par: string,
  ): Promise<void> {
    const conge = await this.congeRepository.findOne({where: {id: id}});
    if (conge) {
      //@ts-ignorets
      conge?.statut = 'conge.Accepte';
      //@ts-ignorets
      delete conge.id;
      await this.congeRepository.updateById(id, conge);
      const congePris = this.congeService.nbJour(
        new Date(conge.date_debut),
        new Date(conge.date_fin),
      );
      this.congeService.updateSoldeConge(conge.personnelId, congePris);
      await this.congeService.genererPdfConge(id, par);
      this.congeService.notificationConge(
        conge.assetId,
        conge.personnelId,
        par,
        'accepter',
      );
    }
  }

  @post('/conges/{id}/refuser/{par}')
  @response(204, {
    description: 'conges refuser success',
  })
  async refuseConge(
    @param.path.string('id') id: string,
    @param.path.string('par') par: string,
  ): Promise<void> {
    const conge = await this.congeRepository.findOne({where: {id: id}});
    if (conge) {
      //@ts-ignorets
      conge?.statut = 'conge.Refuse';
      //@ts-ignorets
      delete conge.id;
      this.congeRepository.updateById(id, conge);
      await this.congeService.genererPdfConge(id, par);
      this.congeService.notificationConge(
        conge.assetId,
        conge.personnelId,
        par,
        'refuser',
      );
    }
  }

  testFunctionController(){
    return 5
  }
}
