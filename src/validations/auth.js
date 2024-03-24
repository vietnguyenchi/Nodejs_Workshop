import Joi from "joi";

export const registerValidator = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "any.required": "Name is required",
        "string.required": "Name is required",
        "string.min": "Name must be at least #{limit} characters",
        "string.max": "Name cannot exceed #{limit} characters"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.empty": "Email is required",
        "string.email": "Email not valid",
    }),
    password: Joi.string().min(6).max(30).required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least #{limit} characters",
        "string.max": "Password cannot exceed #{limit} characters",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.required": "Confirm Password is required",
        "any.only": "Confirm Password do not match",
    }),
    avatar: Joi.string().uri().messages({
        "string.uri": "Avatar must be a valid URL",
    }),
});