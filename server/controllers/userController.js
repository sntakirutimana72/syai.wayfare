import users from '../models/users';
import fDate from '../helpers/fDate';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import unique from '../helpers/unIdentity';
import response from '../helpers/response';
import { userSchema } from '../helpers/validator';

dotenv.config();
const secret = process.env.SECRET_KEY;

class userController {
  // Get all client-users
  static async getAllClients(req, res) {}
  
  // Get a single client-user
  static getUniqueClient(req, res) {}

  // create a user
  static addUser(req, res) {
    let user = userSchema.signup(req.body);
    if(user.value) {
      user = user.value;
      const verifyEmail = unique.uniquEmail(user.email);
      if (!verifyEmail) return response.response(
        res, 403, "Email taken", true);

      // hashing password
      return bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return response.response(res, 500, 'APIs bug', true);
        else {
          user.password = hash;
          const id = unique.uniqueID(users), 
            created_on = fDate(Date());
          users.push(Object.assign(user, {id, created_on}));

          return jwt.sign(
            {data: user}, secret, (err, token) => {
              if(err) return response.response(res, 500, 'APIs bug', tue);
              const {firstname, lastname, email} = user;
              user = null;

              return response.response(
                res, 200, {token, firstname, lastname, email});
            }
          );
        }
      });
    } else return response.response(res, 201, 'Bad formatted data', true);
  }

  // Sign in user
  static signinUser(data, req, res, next) {
    let user = userSchema.signin(req.body);
    if(!user.value) return response.response(
      res, 401, `Login failed due to ${user.error}`, true);
    
    user = user.value;
    let matchPwd = bcrypt.compareSync(user.password, data.password);
    if(!matchPwd) return response.response(
      res, 401, 'Wrong password', true);

    user.is_admin = data.is_admin;
    matchPwd = null;
    return jwt.sign(
      {data: user}, secret, {expiresIn: 86400}, (err, token) => {
        if(err) return response.response(res, 500, 'API bug', true);

        const {firstname, lastname} = data;
        data = null;
        delete user.password;
        user.firstname = firstname;
        user.lastname = lastname;
        return response.response(res, 200, {token, user});
      });
  }

  // update user info
  static updateUser(req, res) {}

  // delete single client-user
  static removeUniqueClient(req, res) {}

  static removeAllClients(req, res) {}
}

export default userController;
