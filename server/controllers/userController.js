import users from '../models/users';
import fDate from '../helpers/fDate';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import logger from '../helpers/logger';
import unique from '../helpers/unIdentity';
import response from '../helpers/response';
import { userSchema } from '../helpers/validator';

dotenv.config();
const secret = process.env.SECRET_KEY;

class userController {
  // Get all client-users
  static getAllClients(data, req, res, next) {}
  
  // Get a single client-user
  static getUniqueClient(req, res, next) {}

  // create a user
  static addUser(req, res) {
    let user = userSchema.signup(req.body);
    if(!user) return response.response(res, 201, 'Invalid inputs', true);

    const verifyEmail = unique.uniquEmail(user.email);
    if (!verifyEmail) return response.response(
      res, 403, "Email taken", true);

    // hashing password
    return bcrypt.hash(user.password, 10, (err, hash) => {
      if(err) return response.response(res, 500, 'API bug-hashing', true);
      else {
        user.password = hash;
        const id = unique.uniqueID(users), 
          created_on = fDate(Date());
        users.push(Object.assign(user, {id, created_on}));

        return jwt.sign(
          {data: user}, secret, (err, token) => {
            if(err) return response.response(res, 500, 'API bug-signing token', tue);
            const {firstname, lastname, email} = user;
            user = null;

            return response.response(
              res, 200, {token, firstname, lastname, email});
          }
        );
      }
    });
  }

  // Sign in user
  static signinUser(req, res) {
    let me = userSchema.signin(req.body);
    if(!me) return response.response(
      res, 401, `Invalid inputs`, true);
    
    const logMeIn = users.find((user) => {
      if (user && (me.email === user.email)) return true;
    });    
    if (!logMeIn) {
      return response.response(res, 401, 'Authentication Failed', true);
    }
    if (!bcrypt.compareSync(me.password, logMeIn.password)) {
      return response.response(res, 401, 'Authentication Failed', true);
    }
    me = null;
    let {firstname, lastname, email, password} = logMeIn;
    return jwt.sign(
      {data: {email, password}}, secret, {expiresIn: 86400}, (err, token) => {
        if(err) return response.response(res, 500, 'API bug', true);
        return response.response(res, 200, {token, firstname, lastname, email});
      });
  }

  // update user info
  static updateUser(req, res) {}

  // delete single client-user
  static removeUniqueClient(req, res) {}

  static removeAllClients(req, res) {}
}

export default userController;
