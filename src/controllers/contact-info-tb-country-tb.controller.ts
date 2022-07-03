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
  CountryTb,
} from '../models';
import {ContactInfoTbRepository} from '../repositories';

export class ContactInfoTbCountryTbController {
  constructor(
    @repository(ContactInfoTbRepository)
    public contactInfoTbRepository: ContactInfoTbRepository,
  ) { }

  @get('/contact-info-tbs/{id}/country-tb', {
    responses: {
      '200': {
        description: 'CountryTb belonging to ContactInfoTb',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CountryTb)},
          },
        },
      },
    },
  })
  async getCountryTb(
    @param.path.number('id') id: typeof ContactInfoTb.prototype.id,
  ): Promise<CountryTb> {
    return this.contactInfoTbRepository.countryTb(id);
  }
}
