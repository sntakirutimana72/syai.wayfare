import Joi from 'joi';

export class userSchema {
  /**
   * @param {FormData} data User Signup form data object
  */
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
    } catch {return;}
  }

  /**
   * @param {FormData} data User Signin form data object
  */
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
    } catch {return;}
  }

  /**
   * @param {FormData} data User update form data object
  */
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
    } catch {return;}
  }
};

export class bookSchema {
  /**
   * @param {FormData} data New Booking form data object
  */
  static book(data) {
    const schema = Joi.object().keys({
      trip_id: Joi.number()
        .integer().min(1)
        .required(), 
      seat_number: Joi.number()
        .integer().min(1) 
    });

    try {
      const newBook = Joi.validate(data, schema);
      console.log(newBook);
      return !newBook.error ? newBook.value : null;
    } catch(err) {
      console.log(err);
      return;
    }
  }

  /**
   * @param {FormData} data Booking update form data object
  */
  static update(data) {
    const schema = Joi.object().keys({
      seat_number: Joi.number()
        .integer().min(1)
        .required(),
    });

    try {
      const update = Joi.validate(data, schema);
      return !update.error ? update.value : null;
    } catch {return;}
  }
};

export class tripSchema {
  /**
   * @param {FormData} data Trip creation form data object
  */
  static create(data) {
    const schema = Joi.object().keys({
      seating_capacity: Joi.number()
        .integer().min(1)
        .required(), 
      bus_licence_number: Joi.string()
        .regex(/^[a-zA-Z0-9]+$/)
        .required(),
      origin: Joi.string()
        .trim().required(), 
      destination: Joi.string()
        .trim().required(),
      trip_date: Joi.date().iso().required(),
      fare: Joi.number().min(1).required(), 
      status: Joi.string()
        .valid(['active', 'cancelled'])
        .default('active').required()
    });
    
    try {
      const trip = Joi.validate(data, schema);
      return !trip.error ? trip.value : null;
    } catch {return;}
  }

  /**
   * @param {FormData} data Trip update form data object
  */
  static update(data) {
    const schema = Joi.object().keys({
      seating_capacity: Joi.number()
        .integer().min(1),
      bus_licence_number: Joi.string()
        .regex(/^[a-zA-Z0-9]+$/)
    });

    try {
      const update = Joi.validate(data, schema);
      return !update.error ? update.value : null;
    } catch {return}
  }
};
