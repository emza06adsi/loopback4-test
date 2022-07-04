import {HttpErrors} from '@loopback/rest';
import isEmail from 'isemail';
import {Credentials} from '../repositories/app-user-tb.repository';

export const validateCredentials = ({Email, Password}: Credentials) => {
  // console.log(Email)
  // console.log(Password)
  if (!isEmail.validate(Email)) {
    throw new HttpErrors.UnprocessableEntity('invalid Email')
    //  HttpErrors.UnprocessableEntity('invalid Email')
  }

  if (Password.length < 8) {
    throw new HttpErrors.UnprocessableEntity('password length should be greater than 8')
  }

}
