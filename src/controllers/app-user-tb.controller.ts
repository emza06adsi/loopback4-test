// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import * as _ from 'lodash';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {AppUserTb} from '../models';
import {AppUserTbRepository, Credentials} from '../repositories';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {JWTService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';
import {validateCredentials} from '../services/validator';
// import {inject} from '@loopback/core';


export class AppUserTbController {
  constructor(
    @repository(AppUserTbRepository)
    public appUserTbRepository: AppUserTbRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jweService: JWTService

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
  @post('app-user/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {

          'application/json': {
            schema: {
              type: 'Object',
              properties: {
                token: {
                  type: 'string'
                }
              },
            },

          },
        },
      },
    }
  })


  async login(@requestBody({
    description: 'The input of login function',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['Email', 'Password'],
          properties: {
            Email: {
              type: 'string',
              // format: 'Email'
            },
            Password: {
              type: 'string',
              minLength: 8
            },
          }
        }
      }

    }
  }) credentials: Credentials): Promise<{token: String}> {
    //make sure user exit, password should be valid
    const user = await this.userService.verifyCredentials(credentials)
    console.log(user)
    const UserProfile = await this.userService.convertToUserProfile(user);
    console.log(UserProfile)
    // generate a jwt web token
    const token = await this.jweService.generateToken(UserProfile);
    return Promise.resolve({token});
  }

}


