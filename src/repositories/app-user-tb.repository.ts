import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AppUserTb, AppUserTbRelations} from '../models';

export type Credentials = {
  Email: string,
  Password: string,
}

export class AppUserTbRepository extends DefaultCrudRepository<
  AppUserTb,
  typeof AppUserTb.prototype.id,
  AppUserTbRelations
> {
  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource,
  ) {
    super(AppUserTb, dataSource);
  }
}
