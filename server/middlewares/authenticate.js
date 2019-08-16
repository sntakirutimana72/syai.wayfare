import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import response from '../helpers/response';

dotenv.config();
const secret_key = process.env.SECRET_KEY;

/**
 * @param {Request} req
 * @param {Response} res
 * @param {RequestRedirect} next 
*/
export default function(req, res, next) {
  try {
    return jwt.verify(
      req.headers.token, secret_key, (err, decoded) => {
        if (err) {
          return response.response(
            res, 401, 'Authentication failed-wrong token', true)
        }

        let tokenUser = decoded.data;
        const realUser = users.find(actualUser => {
          return actualUser ? ((tokenUser.email == actualUser.email) && (
            bcrypt.compareSync(tokenUser.password, actualUser.password))) : null;
        });

        if(realUser) next(realUser);
        else return response.response(
          res, 401, 'Authentication failed', true);
      }
    )
  }
  catch(err) {
    return response.response(
      res, 401, 'Authentication failed', true)
  }
}
