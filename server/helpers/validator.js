import Joi from 'joi';

export class userSchema {
  static signup(data) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .regex(/^[a-z][a-zA-Z0-9_]+@wayfarer.it$/)
        .required(), 
      firstname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(),
      lastname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(), 
      gender: Joi.string()
        .valid(['male', 'female', 'custom'])
        .insensitive().default('custom'),
      dateOfB: Joi.date().max('1-1-2004')
        .iso().required(),
      password: Joi.string()
        .regex(/^([a-zA-Z0-9_@\-+\s=$.,;#&]{4,})$/)
        .required(), 
      is_admin: Joi.bool().strict()
        .default(false).required()
    });
    return Joi.validate(data, schema);
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
    return Joi.validate(data, schema);
  }

  static update(data) {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(),
      lastname: Joi.string()
        .regex(/^([a-zA-Z]{2,})\s?([a-zA-Z]{2,})$/)
        .required(), 
      password: join.string()
        .regex(/^[a-zA-Z0-9_@-+\s=$.,;#&]{4,}$/)
        .required()
    });
    return Joi.validate(data, schema);
  }
};

export class bookingSchema {
  static book(data) {
    const schema = Joi.object().keys({
      trip_id: Joi.string()
        .regex(/^[1-9][0-9]+$/)
        .required(), 
      user_id: Joi.string()
        .regex(/^[1-9][0-9]+$/)
        .required(),
      seat_number: Joi.string()
        .regex(/^[1-9][0-9]+$/)
    });
    return Joi.validate(data, schema);
  }

  static update(data) {
    const schema = Joi.object().keys({
      seat_number: Joi.string()
        .regex(/^[1-9][0-9]+$/).required()
    });
    Joi.validate(data, schema);
  }
};

export class tripSchema {
  static create(data) {
    const schema = Joi.object().keys({
      seating_capacity: Joi.string()
        .regex(/^[1-9][0-9]+$/)
        .required(), 
      bus_licence_number: Joi.string()
        .regex(/^[a-zA-Z0-9]+$$/)
        .required(),
      origin: Joi.string()
        .trim().required(), 
      destination: Joi.string()
        .trim().required(),
      trip_date: Joi.date().max('1-1-2004')
        .iso().required(),
      fare: join.string()
        .number().min(1)
        .required(), 
      status: join.string()
        .valid(['active', 'cancelled'])
        .default('active')
        .required()
    });
    return Joi.validate(data, schema);
  }
};

