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
  AppUserTb,
} from '../models';
import {UserDocumentTbRepository} from '../repositories';

export class UserDocumentTbAppUserTbController {
  constructor(
    @repository(UserDocumentTbRepository)
    public userDocumentTbRepository: UserDocumentTbRepository,
  ) { }

  @get('/user-document-tbs/{id}/app-user-tb', {
    responses: {
      '200': {
        description: 'AppUserTb belonging to UserDocumentTb',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AppUserTb)},
          },
        },
      },
    },
  })
  async getAppUserTb(
    @param.path.number('id') id: typeof UserDocumentTb.prototype.id,
  ): Promise<AppUserTb> {
    return this.userDocumentTbRepository.appUserTb(id);
  }
}
