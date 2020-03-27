import Joi from 'joi';
import { validateSchema } from '../utils/utils';

const optionalLoginRule = Joi.string().alphanum().min(3).max(30);
const optionalPasswordRule = Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/);
const optionalAgeRule = Joi.number().min(4).max(130);

const postUserSchema = Joi.object().keys({
    login: optionalLoginRule.required(),
    password: optionalPasswordRule.required(),
    age: optionalAgeRule.required()
});

const putUserSchema = Joi.object().keys({
    login: optionalLoginRule,
    password: optionalPasswordRule,
    age: optionalAgeRule
});

const authenticateSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const validatePostUserSchema = () => validateSchema(postUserSchema);
export const validatePutUserSchema = () => validateSchema(putUserSchema);
export const validateAuthenticateSchema = () => validateSchema(authenticateSchema);
