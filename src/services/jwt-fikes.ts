// import {HttpErrors, SessionUserProfile} from '@loopback/rest';
// import {promisify} from 'util';
// // import {sign} from 'jsonwebtoken';
// // const jwt = require('jsonwebtoken');
// var jwt = require('jsonwebtoken');

// const singAsync = promisify(jwt.sign)
// // import { SessionUserProfile } from '@loopback/authentication';
// export class JWTService {
//   async generateToken(appUserData: SessionUserProfile): Promise<String> {

//     if (!appUserData) {
//       throw new HttpErrors.Unauthorized('Error while Generating token : appUserData is null')
//     }

//     let token: any = '';
//     try {
//       token = await singAsync(appUserData, '123asdf5', {expiresIn: '7h'});
//     } catch (error) {
//       throw new HttpErrors.Unauthorized(`error generating token ${error}`)
//     }

//     return token
//   }
// }
