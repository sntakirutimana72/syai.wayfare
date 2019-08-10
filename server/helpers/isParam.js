import Joi from 'joi';

export default class {
  static intParam(params) {
    const schema = Joi.object().keys({
      id: Joi.number()
        .integer().min(1).required()
    });
    try {
      const isDigit = join.validate(params, schema);
      return isDigit.value ? isDigit.value : null;
    } catch {return null;}
  }

  static stringParam(params) {
    const schema = Joi.object().keys({
      id: Joi.string()
        .valid(['bus', 'boat', 'train', 'flight'])
        .insensitive().required()
    });
    try {
      const iString = join.validate(params, schema);
      return iString.value ? iString.value : null;
    } catch {return null;}
  }
}
