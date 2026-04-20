// src/schemas/authSchemas.js
const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signupSchema = Joi.object({
  full_name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'professor', 'admin', 'superadmin').required(),
});

module.exports = {
  loginSchema,
  signupSchema,
};