import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TypeDocumentTb, TypeDocumentTbRelations} from '../models';

export class TypeDocumentTbRepository extends DefaultCrudRepository<
  TypeDocumentTb,
  typeof TypeDocumentTb.prototype.id,
  TypeDocumentTbRelations
> {
  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource,
  ) {
    super(TypeDocumentTb, dataSource);
  }
}
