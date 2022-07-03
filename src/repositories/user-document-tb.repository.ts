import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UserDocumentTb, UserDocumentTbRelations, TypeDocumentTb} from '../models';
import {TypeDocumentTbRepository} from './type-document-tb.repository';

export class UserDocumentTbRepository extends DefaultCrudRepository<
  UserDocumentTb,
  typeof UserDocumentTb.prototype.id,
  UserDocumentTbRelations
> {

  public readonly typeDocumentTb: BelongsToAccessor<TypeDocumentTb, typeof UserDocumentTb.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('TypeDocumentTbRepository') protected typeDocumentTbRepositoryGetter: Getter<TypeDocumentTbRepository>,
  ) {
    super(UserDocumentTb, dataSource);
    this.typeDocumentTb = this.createBelongsToAccessorFor('typeDocumentTb', typeDocumentTbRepositoryGetter,);
    this.registerInclusionResolver('typeDocumentTb', this.typeDocumentTb.inclusionResolver);
  }
}
