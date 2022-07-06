import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UserDocumentTb, UserDocumentTbRelations, TypeDocumentTb, AppUserTb} from '../models';
import {TypeDocumentTbRepository} from './type-document-tb.repository';
import {AppUserTbRepository} from './app-user-tb.repository';

export class UserDocumentTbRepository extends DefaultCrudRepository<
  UserDocumentTb,
  typeof UserDocumentTb.prototype.id,
  UserDocumentTbRelations
> {

  public readonly typeDocumentTb: BelongsToAccessor<TypeDocumentTb, typeof UserDocumentTb.prototype.id>;

  public readonly appUserTb: BelongsToAccessor<AppUserTb, typeof UserDocumentTb.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('TypeDocumentTbRepository') protected typeDocumentTbRepositoryGetter: Getter<TypeDocumentTbRepository>, @repository.getter('AppUserTbRepository') protected appUserTbRepositoryGetter: Getter<AppUserTbRepository>,
  ) {
    super(UserDocumentTb, dataSource);
    this.appUserTb = this.createBelongsToAccessorFor('appUserTb', appUserTbRepositoryGetter,);
    this.registerInclusionResolver('appUserTb', this.appUserTb.inclusionResolver);
    this.typeDocumentTb = this.createBelongsToAccessorFor('typeDocumentTb', typeDocumentTbRepositoryGetter,);
    this.registerInclusionResolver('typeDocumentTb', this.typeDocumentTb.inclusionResolver);
  }
}
