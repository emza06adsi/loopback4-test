// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import * as _ from 'lodash';
import {AppUserTb} from '../models';
import {AppUserTbRepository} from '../repositories';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {validateCredentials} from '../services/validator';
// import {inject} from '@loopback/core';


export class AppUserTbController {
  constructor(
    @repository(AppUserTbRepository)
    public appUserTbRepository: AppUserTbRepository,
    @inject('service.hasher') public hasher: BcryptHasher,
  ) { }

  @post('/signup', {
    responses: {
      '200': {
        description: 'AppUser',
        content: {
          schema: getJsonSchemaRef(AppUserTb)
        }
      }
    }
  })

  async signup(@requestBody() appUserData: AppUserTb) {
    const {Email, Password = ""} = appUserData;
    validateCredentials(_.pick({Email, Password}, ['Email', 'Password']));

    appUserData.Password = await this.hasher.hashPassword(Password)
    const savedAppUserTb = await this.appUserTbRepository.create(appUserData)
    delete savedAppUserTb.Password;
    return savedAppUserTb;
  };

}
