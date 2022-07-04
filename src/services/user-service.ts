import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {AppUserTb} from '../models';
import {AppUserTbRepository, Credentials} from '../repositories';
import {BcryptHasher} from './hash.password.bcrypt';


export class MyUserService implements UserService<AppUserTb, Credentials>{

  constructor(@repository(AppUserTbRepository)
  public appUserRepository: AppUserTbRepository,
    @inject('service.hasher')
    public hasher: BcryptHasher,
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<AppUserTb> {
    const foundUser = await this.appUserRepository.findOne({
      where: {
        Email: credentials.Email
      }
    })

    if (!foundUser) {
      throw new HttpErrors.NotFound(`user not found with this ${credentials.Email}`)
    }

    const {Password = ''} = foundUser;

    const passwordMatched = await this.hasher.comparePassword(
      credentials.Password,
      Password
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('password is not valid')
    }

    return foundUser;
  }

  convertToUserProfile(
    user: AppUserTb
  ): UserProfile | any {
    let userName = '';
    if (user.UserName) {
      userName = user.UserName;
    }
    if (user.LastName) {
      userName = user.UserName
        ? `${user.UserName} ${user.LastName}`
        : user.LastName;
    }
    return {id: user.id, name: userName};

  }

}
