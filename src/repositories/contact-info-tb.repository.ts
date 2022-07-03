import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ContactInfoTb, ContactInfoTbRelations, CountryTb} from '../models';
import {CountryTbRepository} from './country-tb.repository';

export class ContactInfoTbRepository extends DefaultCrudRepository<
  ContactInfoTb,
  typeof ContactInfoTb.prototype.id,
  ContactInfoTbRelations
> {

  public readonly countryTb: BelongsToAccessor<CountryTb, typeof ContactInfoTb.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('CountryTbRepository') protected countryTbRepositoryGetter: Getter<CountryTbRepository>,
  ) {
    super(ContactInfoTb, dataSource);
    this.countryTb = this.createBelongsToAccessorFor('countryTb', countryTbRepositoryGetter,);
    this.registerInclusionResolver('countryTb', this.countryTb.inclusionResolver);
  }
}
