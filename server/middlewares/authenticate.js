import users from '../models/users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import response from '../helpers/response';

dotenv.config();
const secret_key = process.env.SECRET_KEY;

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
          if((tokenUser.email == actualUser.email) && (
            tokenUser.password == actualUser.password)) {
            return true;
          }
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
