import {inject} from '@loopback/core';
import {HttpErrors, SessionUserProfile} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import jwt from 'jsonwebtoken';
import {TokenServiceBindings} from '../keys';
// const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');

// const verifyAsync = promisify(jwt.verify)



export const encodeJWT = (
  payload: string | object | Buffer,
  jwtSecret: string,
  expiresIn: string
): Promise<unknown> => {
  return new Promise(
    (resolve, reject) => {
      jwt.sign(
        payload,
        jwtSecret,
        {expiresIn: expiresIn},
        (err, token) => {
          if (err) return reject(err);
          else return resolve(token);
        }
      );
    }
  );
}

export const verifyAsync = (
  token: string,
  jwtSecret: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      jwtSecret,
      (err, token) => {
        if (err) return reject(err);
        else return resolve(token);
      })
  })
}

export class JWTService {
  @inject(TokenServiceBindings.TOKEN_SECRET)
  public readonly jwtSecret: string
  @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
  public readonly expiresIn: string

  async generateToken(appUserData: SessionUserProfile): Promise<String> {

    if (!appUserData) {
      throw new HttpErrors.Unauthorized(
        'Error while Generating token : appUserData is null'
      )
    }

    let token: any = '';
    try {
      token = await encodeJWT(
        appUserData,
        this.jwtSecret,
        this.expiresIn
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `error generating token ${error}`)
    }

    return token
  }

  async verifyToken(token: string): Promise<UserProfile | any> {

    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      )
    }

    let UserProfile: UserProfile | any;

    try {
      // decode user profile from token
      const {id = "", name = ""} =
        await verifyAsync(token, this.jwtSecret);
      // don´t copy over token field 'iat' and 'exp', nor  'Email' to user Profile
      UserProfile = Object.assign(
        {id, name}
      );

    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error verifying token : ${error.message}`)
    }

    return UserProfile;

  };

}

