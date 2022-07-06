import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ContactInfoTb,
  AppUserTb,
} from '../models';
import {ContactInfoTbRepository} from '../repositories';

export class ContactInfoTbAppUserTbController {
  constructor(
    @repository(ContactInfoTbRepository)
    public contactInfoTbRepository: ContactInfoTbRepository,
  ) { }

  @get('/contact-info-tbs/{id}/app-user-tb', {
    responses: {
      '200': {
        description: 'AppUserTb belonging to ContactInfoTb',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AppUserTb)},
          },
        },
      },
    },
  })
  async getAppUserTb(
    @param.path.number('id') id: typeof ContactInfoTb.prototype.id,
  ): Promise<AppUserTb> {
    return this.contactInfoTbRepository.appUserTb(id);
  }
}
