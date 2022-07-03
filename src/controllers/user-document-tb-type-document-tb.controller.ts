import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserDocumentTb,
  TypeDocumentTb,
} from '../models';
import {UserDocumentTbRepository} from '../repositories';

export class UserDocumentTbTypeDocumentTbController {
  constructor(
    @repository(UserDocumentTbRepository)
    public userDocumentTbRepository: UserDocumentTbRepository,
  ) { }

  @get('/user-document-tbs/{id}/type-document-tb', {
    responses: {
      '200': {
        description: 'TypeDocumentTb belonging to UserDocumentTb',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeDocumentTb)},
          },
        },
      },
    },
  })
  async getTypeDocumentTb(
    @param.path.number('id') id: typeof UserDocumentTb.prototype.id,
  ): Promise<TypeDocumentTb> {
    return this.userDocumentTbRepository.typeDocumentTb(id);
  }
}
