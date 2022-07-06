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
import {PermissionKeys} from '../authorization/permission-keys';
import {CountryTb} from '../models';
import {CountryTbRepository} from '../repositories';

export class CountryTbController {
  constructor(
    @repository(CountryTbRepository)
    public countryTbRepository: CountryTbRepository,
  ) { }

  @post('/country-tb')
  @response(200, {
    description: 'CountryTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(CountryTb)}},
  })
  @authenticate({
    strategy: 'jwt',
    options: [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.UpdateTypeDocument]
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryTb, {
            title: 'NewCountryTb',

          }),
        },
      },
    })
    countryTb: CountryTb,
  ): Promise<CountryTb> {
    return this.countryTbRepository.create(countryTb);
  }

  @get('/country-tb/count')
  @response(200, {
    description: 'CountryTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CountryTb) where?: Where<CountryTb>,
  ): Promise<Count> {
    return this.countryTbRepository.count(where);
  }

  @get('/country-tb')
  @response(200, {
    description: 'Array of CountryTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CountryTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CountryTb) filter?: Filter<CountryTb>,
  ): Promise<CountryTb[]> {
    return this.countryTbRepository.find(filter);
  }

  @patch('/country-tb')
  @response(200, {
    description: 'CountryTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })

  @authenticate({
    strategy: 'jwt',
    options: [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.UpdateTypeDocument]
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryTb, {partial: true}),
        },
      },
    })
    countryTb: CountryTb,
    @param.where(CountryTb) where?: Where<CountryTb>,
  ): Promise<Count> {
    return this.countryTbRepository.updateAll(countryTb, where);
  }

  @get('/country-tb/{id}')
  @response(200, {
    description: 'CountryTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CountryTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CountryTb, {exclude: 'where'}) filter?: FilterExcludingWhere<CountryTb>
  ): Promise<CountryTb> {
    return this.countryTbRepository.findById(id, filter);
  }

  @patch('/country-tb/{id}')
  @response(204, {
    description: 'CountryTb PATCH success',
  })

  @authenticate({
    strategy: 'jwt',
    options: [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.UpdateTypeDocument]
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryTb, {partial: true}),
        },
      },
    })
    countryTb: CountryTb,
  ): Promise<void> {
    await this.countryTbRepository.updateById(id, countryTb);
  }

  @put('/country-tb/{id}')
  @response(204, {
    description: 'CountryTb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() countryTb: CountryTb,
  ): Promise<void> {
    await this.countryTbRepository.replaceById(id, countryTb);
  }

  @del('/country-tb/{id}')
  @response(204, {
    description: 'CountryTb DELETE success',
  })
  @authenticate({
    strategy: 'jwt',
    options: [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.UpdateTypeDocument]
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.countryTbRepository.deleteById(id);
  }
}
