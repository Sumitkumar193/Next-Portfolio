import Joi from "joi";

export const LoginValidation = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
});

export const RegisterValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required(),
});