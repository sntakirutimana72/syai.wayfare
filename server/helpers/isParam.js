import Joi from 'joi';

export default class {
  /**
   * @param {Number} params URL parameter as integer
  */
  static intParam(params) {
    const schema = Joi.object().keys({
      id: Joi.number()
        .integer().min(1).required()
    });
    
    try {
      const isDigit = Joi.validate(params, schema);
      return !isDigit.error ? isDigit.value.id : null;
    } catch {return null;}
  }

  /**
   * @param {String} params URL parameter as string 
  */
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
