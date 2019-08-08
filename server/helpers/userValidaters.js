import Joi from 'joi';

export const signupUser = Joi.object().keys({
  email: Joi.string().regex().required(), 
  firstname: Joi.string().regex().required(),
  lastname: Joi.string().regex().required(), 
  fromYear: Joi.date().required(),
  toYear: Joi.date().required()
});

export const signinUser = Joi.object().keys({
  id: Joi.string().uuid()
});

export const updateUser = Joi.object().keys({
  school: Joi.string()
    .trim()
    .required(),
  degree: Joi.string()
    .trim()
    .valid(['Bachelor', 'Masters']),
  major: Joi.string().trim(),
  fromYear: Joi.date(),
  toYear: Joi.date()
});
