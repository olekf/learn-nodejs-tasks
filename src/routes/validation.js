import Joi from 'joi';
import { validateSchema } from '../utils/utils';

const optionalLoginRule = Joi.string().alphanum().min(3).max(30);
const optionalPasswordRule = Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/);
const optionalAgeRule = Joi.number().min(4).max(130);
const optionalGroupId = Joi.string().regex(/^[a-fA-F0-9/-]*$/);

const postUserSchema = Joi.object().keys({
    login: optionalLoginRule.required(),
    password: optionalPasswordRule.required(),
    age: optionalAgeRule.required(),
    groupId: optionalGroupId
});

const putUserSchema = Joi.object().keys({
    login: optionalLoginRule,
    password: optionalPasswordRule,
    age: optionalAgeRule,
    groupId: optionalGroupId
});

const postGroupSchema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    permissions: Joi.array().items(Joi.string().regex(/^(READ|WRITE|DELETE|SHARE|UPLOAD_FILES)$/))
});

const authenticateSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const validatePostUserSchema = () => validateSchema(postUserSchema);
export const validatePutUserSchema = () => validateSchema(putUserSchema);
export const validatePostGroupSchema = () => validateSchema(postGroupSchema);
export const validateAuthenticateSchema = () => validateSchema(authenticateSchema);
