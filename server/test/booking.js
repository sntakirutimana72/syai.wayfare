import chai from 'chai';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import server from '../server';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';

const { expect } = chai;

dotenv.config();
chai.use(chaiHttp);

const booking = {
  trip_id: 3
};
const credentials = {
  email: 'yvesrocher@wayfarer.it', 
  password: bcrypt.hashSync('Mukamanata3', 10)
};
const token = jwt.sign(credentials, 
  process.env.SECRET_KEY, {expiresIn: '3h'});

console.log(credentials);