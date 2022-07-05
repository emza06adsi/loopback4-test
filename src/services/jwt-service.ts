import {inject} from '@loopback/core';
import {HttpErrors, SessionUserProfile} from '@loopback/rest';
import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');

// const singAsync = promisify(jwt.sign)

export const encodeJWT = (
  payload: string | object | Buffer,
  jwtSecret: string,
  expiresIn: string
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, {expiresIn: expiresIn}, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
}


export class JWTService {
  @inject('authentication.jwt.secret')
  public readonly jwtSecret: string
  @inject('authentication.jwt.expiresIn')
  public readonly expiresIn: string

  async generateToken(appUserData: SessionUserProfile): Promise<String> {

    if (!appUserData) {
      throw new HttpErrors.Unauthorized('Error while Generating token : appUserData is null')
    }

    let token: any = '';
    try {
      token = await encodeJWT(
        appUserData,
        this.jwtSecret,
        this.expiresIn
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(`error generating token ${error}`)
    }

    return token
  }
}

