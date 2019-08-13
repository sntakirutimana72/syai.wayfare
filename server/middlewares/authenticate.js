import users from '../models/users';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import response from '../helpers/response';

dotenv.config();
const secret_key = process.env.SECRET_KEY;

export default function (req, res, next) {
  try {
    return jwt.verify(
      req.headers.token, secret_key, (err, decoded) => {
        if (err) {
          return response.response(res, 401, 'Unauthorized personnel', true)
        }

        const user = decoded.data;
        const realUser = users.find(u => {
          if(u && u.email == user.email && u.password == user.password)
            return true
        });
        
        if(realUser) next(realUser);
        else return response.response(res, 401, 'Authentication failed', true);
      }
    )
  }
  catch(err) {
    return response.response(res, 500, err, true)
  }
}
