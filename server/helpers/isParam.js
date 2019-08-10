import Joi from 'joi';
import logger from './logger';

export default class {
  static intParam(params) {
    const schema = Joi.object().keys({
      id: Joi.number()
        .integer().min(1).required()
    });
    
    try {
      const isDigit = Joi.validate(params, schema);
      logger.debug(isDigit.error);
      return !isDigit.error ? isDigit.value.id : null;
    } catch {return null;}
  }

  static stringParam(params) {
    const schema = Joi.object().keys({
      id: Joi.string()
        .valid(['bus', 'boat', 'train', 'flight'])
        .insensitive().required()
    });

    try {
      const iString = Joi.validate(params, schema);
      return !iString.error ? iString.value.id : null;
    } catch {return null;}
  }
}
