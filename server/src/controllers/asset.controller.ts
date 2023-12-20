import {inject, service} from '@loopback/core';
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
  Request,
  Response,
  RestBindings,
} from '@loopback/rest';
import {Asset} from '../models';
import {AssetRepository} from '../repositories';
import {FileProvider, FileStorageService} from '../services';
import {RequestHandler} from 'express-serve-static-core';
import mime from 'mime-types';
import {authenticate} from '@loopback/authentication';

export class AssetController {
  constructor(
    @repository(AssetRepository)
    public assetRepository: AssetRepository,
    @service(FileProvider)
    public uploadHandler: RequestHandler,
    @service(FileStorageService)
    public fileStorage: FileStorageService,
  ) {}

  /*@post('/assets')
  @response(200, {
    description: 'Asset model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asset)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asset, {
            title: 'NewAsset',
            exclude: ['id'],
          }),
        },
      },
    })
    asset: Omit<Asset, 'id'>,
  ): Promise<Asset> {
    return this.assetRepository.create(asset);
  }*/

  @post('/assets', {
    description:
      'File upload using multipart/form-data use the key to define the asset ID.',
    responses: {
      204: {
        description: 'Asset upload success.',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<Partial<Asset>[]> {
    return new Promise<Partial<Asset>[]>((resolve, reject) => {
      this.uploadHandler(request, response, async (err: unknown) => {
        if (err) reject(err);
        else {
          try {
            const uploadedFiles = request.files;
            const files = [];
            const mapper = async (f: globalThis.Express.Multer.File) => {
              const newFile = await this.assetRepository.create(
                new Asset({
                  contentType:
                    mime.lookup(f.originalname) || 'application/octet-stream',
                  size: f.size,
                }),
              );
              if (!newFile.id) {
                throw new Error('Problem creating Asset entity.');
              }
              this.fileStorage.saveFileSync(newFile.id, f.buffer);
              return newFile;
            };
            if (Array.isArray(uploadedFiles)) {
              files.push(...uploadedFiles.map(mapper));
            } else {
              for (const filename in uploadedFiles) {
                files.push(...uploadedFiles[filename].map(mapper));
              }
            }
            Promise.all(files).then(resolve);
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  }

  @get('/assets/count')
  @response(200, {
    description: 'Asset model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Asset) where?: Where<Asset>): Promise<Count> {
    return this.assetRepository.count(where);
  }

  @get('/assets')
  @response(200, {
    description: 'Array of Asset model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asset, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Asset) filter?: Filter<Asset>): Promise<Asset[]> {
    return this.assetRepository.find(filter);
  }

  @patch('/assets')
  @response(200, {
    description: 'Asset PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asset, {partial: true}),
        },
      },
    })
    asset: Asset,
    @param.where(Asset) where?: Where<Asset>,
  ): Promise<Count> {
    return this.assetRepository.updateAll(asset, where);
  }

  @get('/assets/{id}')
  @response(200, {
    description: 'Asset model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asset, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asset, {exclude: 'where'})
    filter?: FilterExcludingWhere<Asset>,
  ): Promise<Asset> {
    return this.assetRepository.findById(id, filter);
  }

  @patch('/assets/{id}')
  @response(204, {
    description: 'Asset PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asset, {partial: true}),
        },
      },
    })
    asset: Asset,
  ): Promise<void> {
    await this.assetRepository.updateById(id, asset);
  }

  @put('/assets/{id}')
  @response(204, {
    description: 'Asset PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asset: Asset,
  ): Promise<void> {
    await this.assetRepository.replaceById(id, asset);
  }

  @del('/assets/{id}')
  @response(204, {
    description: 'Asset DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.assetRepository.deleteById(id);
  }

  @post('/assets/{id}/copy', {
    responses: {
      '200': {
        description: 'Asset model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Asset, {includeRelations: true}),
          },
        },
      },
    },
  })
  async copyById(
    @param.path.string('id') id: string,
    @param.filter(Asset, {exclude: 'where'})
    filter?: FilterExcludingWhere<Asset>,
  ): Promise<Asset> {
    const asset = await this.assetRepository.findById(id, filter);
    //@ts-ignore
    delete asset.id;
    const newAsset = await this.assetRepository.create(asset);
    try {
      if (newAsset.id) {
        await this.fileStorage.copyFile(id, newAsset.id);
      }
      return newAsset;
    } catch (e) {
      await this.assetRepository.deleteById(newAsset.id);
      throw e;
    }
  }

  @get('/assets/{id}/download', {
    responses: {
      '200': {
        description: 'Asset model instance',
        content: {
          '*/*': {
            schema: {type: 'string', format: 'binary'},
          },
        },
      },
    },
  })
  async downloadById(
    @param.path.string('id') id: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('attachment') attachment?: string,
  ): Promise<void> {
    const asset = await this.assetRepository.findById(id);
    let extension;
    if (asset.contentType) {
      response.contentType(asset.contentType);
      extension = mime.extension(asset.contentType);
    }
    if (attachment) {
      if (extension) {
        attachment += '.' + extension;
      }
      response.setHeader(
        'Content-Disposition',
        `attachment; filename="${attachment}"`,
      );
    }
    response.send(await this.fileStorage.getFile(id));
  }
}
