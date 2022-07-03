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
import {AppUserTb} from '../models';
import {AppUserTbRepository} from '../repositories';

export class AppUserTbController {
  constructor(
    @repository(AppUserTbRepository)
    public appUserTbRepository : AppUserTbRepository,
  ) {}

  @post('/app-user-tb')
  @response(200, {
    description: 'AppUserTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppUserTb)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTb, {
            title: 'NewAppUserTb',
            
          }),
        },
      },
    })
    appUserTb: AppUserTb,
  ): Promise<AppUserTb> {
    return this.appUserTbRepository.create(appUserTb);
  }

  @get('/app-user-tb/count')
  @response(200, {
    description: 'AppUserTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AppUserTb) where?: Where<AppUserTb>,
  ): Promise<Count> {
    return this.appUserTbRepository.count(where);
  }

  @get('/app-user-tb')
  @response(200, {
    description: 'Array of AppUserTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AppUserTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AppUserTb) filter?: Filter<AppUserTb>,
  ): Promise<AppUserTb[]> {
    return this.appUserTbRepository.find(filter);
  }

  @patch('/app-user-tb')
  @response(200, {
    description: 'AppUserTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTb, {partial: true}),
        },
      },
    })
    appUserTb: AppUserTb,
    @param.where(AppUserTb) where?: Where<AppUserTb>,
  ): Promise<Count> {
    return this.appUserTbRepository.updateAll(appUserTb, where);
  }

  @get('/app-user-tb/{id}')
  @response(200, {
    description: 'AppUserTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppUserTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AppUserTb, {exclude: 'where'}) filter?: FilterExcludingWhere<AppUserTb>
  ): Promise<AppUserTb> {
    return this.appUserTbRepository.findById(id, filter);
  }

  @patch('/app-user-tb/{id}')
  @response(204, {
    description: 'AppUserTb PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUserTb, {partial: true}),
        },
      },
    })
    appUserTb: AppUserTb,
  ): Promise<void> {
    await this.appUserTbRepository.updateById(id, appUserTb);
  }

  @put('/app-user-tb/{id}')
  @response(204, {
    description: 'AppUserTb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() appUserTb: AppUserTb,
  ): Promise<void> {
    await this.appUserTbRepository.replaceById(id, appUserTb);
  }

  @del('/app-user-tb/{id}')
  @response(204, {
    description: 'AppUserTb DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appUserTbRepository.deleteById(id);
  }
}
