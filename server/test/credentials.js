import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const users = {
  admin: {
    firstname: 'Ntakirutimana',
    lastname: 'Steven',
    email: 'sntakirutimana72@wayfarer.it',
    gender: 'male',
    dateOfB: '1993-01-01',
    password: 'Mukamanata3',
    is_admin: true
  }, client: {
    firstname: 'Uwimana',
    lastname: 'Yves Rocher',
    email: 'yvesrocher@wayfarer.it',
    gender: 'male',
    dateOfB: '1994-01-01',
    password: 'Mukamanata3',
    is_admin: false
  }
};

const SECRET_KEY = process.env.SECRET_KEY;

export const admin = jwt.sign(
  {data: {
    email: users.admin.email, 
    password: users.admin.password
  }}, SECRET_KEY, {expiresIn: '3h'}
);

export const client = jwt.sign(
  {data: {
    email: users.client.email, 
    password: users.client.password
  }}, SECRET_KEY, {expiresIn: '3h'}
);
