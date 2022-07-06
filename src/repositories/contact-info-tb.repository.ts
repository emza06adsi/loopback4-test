import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ContactInfoTb, ContactInfoTbRelations, CountryTb, AppUserTb} from '../models';
import {CountryTbRepository} from './country-tb.repository';
import {AppUserTbRepository} from './app-user-tb.repository';

export class ContactInfoTbRepository extends DefaultCrudRepository<
  ContactInfoTb,
  typeof ContactInfoTb.prototype.id,
  ContactInfoTbRelations
> {

  public readonly countryTb: BelongsToAccessor<CountryTb, typeof ContactInfoTb.prototype.id>;

  public readonly appUserTb: BelongsToAccessor<AppUserTb, typeof ContactInfoTb.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('CountryTbRepository') protected countryTbRepositoryGetter: Getter<CountryTbRepository>, @repository.getter('AppUserTbRepository') protected appUserTbRepositoryGetter: Getter<AppUserTbRepository>,
  ) {
    super(ContactInfoTb, dataSource);
    this.appUserTb = this.createBelongsToAccessorFor('appUserTb', appUserTbRepositoryGetter,);
    this.registerInclusionResolver('appUserTb', this.appUserTb.inclusionResolver);
    this.countryTb = this.createBelongsToAccessorFor('countryTb', countryTbRepositoryGetter,);
    this.registerInclusionResolver('countryTb', this.countryTb.inclusionResolver);
  }
}
