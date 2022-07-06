// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import _ from 'lodash';
import {PermissionKeys} from '../authorization/permission-keys';
import {PasswordHasherBindings} from '../keys';
import {AppUserTb} from '../models';
import {AppUserTbRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {validateCredentials} from '../services/validator';

// import {inject} from '@loopback/core';


export class AdminController {
  constructor(
    @repository(AppUserTbRepository)
    public appUserTbRepository: AppUserTbRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) { }
  @post('/admin', {
    responses: {
      '200': {
        description: 'Admin',
        content: {
          schema: getJsonSchemaRef(AppUserTb)
        }
      }
    }
  })


  async Create(@requestBody() admin: AppUserTb) {
    const {Email, Password = ""} = admin;
    validateCredentials(_.pick({Email, Password}, ['Email', 'Password']));

    admin.permissions = [
      PermissionKeys.CreateTypeDocument,
      PermissionKeys.UpdateTypeDocument,
      PermissionKeys.DeleteTypeDocument
    ]

    admin.Password = await this.hasher.hashPassword(Password)
    const savedAdmin = await this.appUserTbRepository.create(admin)
    delete savedAdmin.Password;
    return savedAdmin;
  };
}
