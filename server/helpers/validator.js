import Joi from 'joi';
import logger from './logger';

export class userSchema {
  static signup(data) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .regex(/^([a-z][a-zA-Z0-9_]+@wayfarer.it)$/)
        .required(), 
      firstname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(),
      lastname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(), 
      gender: Joi.string()
        .valid(['male', 'female', 'custom'])
        .insensitive().default('custom').required(),
      dateOfB: Joi.date().max('1-1-2005')
        .iso().required(),
      password: Joi.string()
        .regex(/^([a-zA-Z0-9_@\-+\s=$.,;#&]{4,})$/)
        .required(), 
      is_admin: Joi.bool().strict()
        .default(false).required()
    });

    try {
      const user = Joi.validate(data, schema);
      return !user.error ? user.value : null;
    } catch {return null;}
  }

  static signin(data) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .regex(/^[a-z][a-zA-Z0-9_]+@wayfarer.it$/)
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9_@\-+\s=$.,;#&]{4,}$/)
        .required()
    });

    try {
      const user = Joi.validate(data, schema);
      return !user.error ? user.value : null;
    } catch {return null;}
  }

  static update(data) {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(),
      lastname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(), 
      password: Joi.string()
        .regex(/^[a-zA-Z0-9_@\-+\s=$.,;#&]{4,}$/)
        .required()
    });
    
    try {
      const user = Joi.validate(data, schema);
      return !user.error ? user.value : null;
    } catch {return null;}
  }
};

export class bookSchema {
  static book(data) {
    const schema = Joi.object().keys({
      trip_id: Joi.string()
        .regex(/^[1-9][0-9]+$/)
        .required(),
      seat_number: Joi.string()
        .regex(/^[1-9][0-9]+$/)
    });

    try {
      const newBook = Joi.validate(data, schema);
      return !newBook.error ? newBook.value : null;
    } catch {return null;}
  }

  static update(data) {
    const schema = Joi.object().keys({
      seat_number: Joi.string()
        .regex(/^[1-9][0-9]+$/).required()
    });

    try {
      const update = Joi.validate(data, schema);
      return !update.error ? update.value : null;
    } catch {return null;}
  }
};

export class tripSchema {
  static create(data) {
    const schema = Joi.object().keys({
      seating_capacity: Joi.number()
        .integer().min(1)
        .required(), 
      bus_licence_number: Joi.string()
        .regex(/^[a-zA-Z0-9]+$$/)
        .required(),
      origin: Joi.string()
        .trim().required(), 
      destination: Joi.string()
        .trim().required(),
      trip_date: Joi.date().iso().required(),
      fare: Joi.number().min(1)
        .required(), 
      status: Joi.string()
        .valid(['active', 'cancelled'])
        .default('active')
        .required()
    });
    
    try {
      const trip = Joi.validate(data, schema);
      return !trip.error ? trip.value : null;
    } catch {return null;}
  }
};
