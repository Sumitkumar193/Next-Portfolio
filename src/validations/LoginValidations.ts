import Joi from "joi";

export const LoginValidation = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters long",
        "string.empty": "Password is required",
    }),
});

export const RegisterValidation = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name is required",
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters long",
        "string.empty": "Password is required",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords must match",
        "string.empty": "Confirm Password is required",
    }),
});