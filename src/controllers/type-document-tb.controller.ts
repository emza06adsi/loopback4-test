import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {PermissionKeys} from '../authorization/permission-keys';
import {TypeDocumentTb} from '../models';
import {TypeDocumentTbRepository} from '../repositories';

export class TypeDocumentTbController {
  constructor(
    @repository(TypeDocumentTbRepository)
    public typeDocumentTbRepository: TypeDocumentTbRepository,
  ) { }

  @post('/type-document-tb')
  @response(200, {
    description: 'TypeDocumentTb model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypeDocumentTb)}},
  })

  //admin should be authentication
  //only admin can access this route
  //please run x and y function
  // @authenticate('jwt',()=>{})
  @authenticate({
    strategy: 'jwt',
    options: [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.UpdateTypeDocument]
  })
  // @AuthenticationComponent('jwt',)
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocumentTb, {
            title: 'NewTypeDocumentTb',

          }),
        },
      },
    })
    typeDocumentTb: TypeDocumentTb,
  ): Promise<TypeDocumentTb> {
    return this.typeDocumentTbRepository.create(typeDocumentTb);
  }

  @get('/type-document-tb/count')
  @response(200, {
    description: 'TypeDocumentTb model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TypeDocumentTb) where?: Where<TypeDocumentTb>,
  ): Promise<Count> {
    return this.typeDocumentTbRepository.count(where);
  }

  @get('/type-document-tb')
  @response(200, {
    description: 'Array of TypeDocumentTb model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeDocumentTb, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypeDocumentTb) filter?: Filter<TypeDocumentTb>,
  ): Promise<TypeDocumentTb[]> {
    return this.typeDocumentTbRepository.find(filter);
  }

  @patch('/type-document-tb')
  @response(200, {
    description: 'TypeDocumentTb PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })

  @authenticate({
    strategy: 'jwt',
    options: [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.UpdateTypeDocument]
  })
  //admin should be authentication
  //only admin can access this route

  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocumentTb, {partial: true}),
        },
      },
    })
    typeDocumentTb: TypeDocumentTb,
    @param.where(TypeDocumentTb) where?: Where<TypeDocumentTb>,
  ): Promise<Count> {
    return this.typeDocumentTbRepository.updateAll(typeDocumentTb, where);
  }

  @get('/type-document-tb/{id}')
  @response(200, {
    description: 'TypeDocumentTb model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypeDocumentTb, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TypeDocumentTb, {exclude: 'where'}) filter?: FilterExcludingWhere<TypeDocumentTb>
  ): Promise<TypeDocumentTb> {
    return this.typeDocumentTbRepository.findById(id, filter);
  }

  @patch('/type-document-tb/{id}')
  @response(204, {
    description: 'TypeDocumentTb PATCH success',
  })

  //admin should be authentication
  //only admin can access this route
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
          schema: getModelSchemaRef(TypeDocumentTb, {partial: true}),
        },
      },
    })
    typeDocumentTb: TypeDocumentTb,
  ): Promise<void> {
    await this.typeDocumentTbRepository.updateById(id, typeDocumentTb);
  }

  @put('/type-document-tb/{id}')
  @response(204, {
    description: 'TypeDocumentTb PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() typeDocumentTb: TypeDocumentTb,
  ): Promise<void> {
    await this.typeDocumentTbRepository.replaceById(id, typeDocumentTb);
  }

  //admin should be authentication
  //only admin can access this route

  @del('/type-document-tb/{id}')
  @response(204, {
    description: 'TypeDocumentTb DELETE success',
  })
  @authenticate({
    strategy: 'jwt',
    options: [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.UpdateTypeDocument]
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.typeDocumentTbRepository.deleteById(id);
  }
}
