import Joi from 'joi';
import response from '../helpers/response'

export class IsParam {
  static comfirParam(req, res, next) {
    const schema = Joi.object().keys({
      id: Joi.number().required()
    });
    const isDigit = join.validate(req.params, schema);
    if (!isDigit) return response.response(
      res, 400, 'Bad parameter', true);
    next();
  }
}