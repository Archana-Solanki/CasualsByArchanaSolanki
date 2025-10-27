const Joi = require('joi');

// generic middleware to validate req.body against a Joi schema
function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const details = error.details.map(d => d.message);
      return res.status(400).json({ success: false, message: 'Validation failed', errors: details });
    }
    req.body = value; // use the validated/stripped value
    next();
  };
}

// Schemas
const loginSchema = Joi.object({
  userNumber: Joi.string().pattern(/^\d{10}$/).required().messages({ 'string.pattern.base': 'userNumber must be a 10 digit phone number' }),
  userPassword: Joi.string().min(8).required(),
});

const signupSchema = Joi.object({
  userName: Joi.string().min(2).max(100).required(),
  userNumber: Joi.string().pattern(/^\d{10}$/).required(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().min(8).required(),
  userAddressLine1: Joi.string().min(5).required(),
  userAddressLine2: Joi.string().allow('', null),
  userAddressPincode: Joi.string().pattern(/^\d{6}$/).required(),
  userAddressCity: Joi.string().min(2).required(),
  userAddressState: Joi.string().min(2).required(),
});

module.exports = {
  validateBody,
  schemas: {
    loginSchema,
    signupSchema,
  }
};
