const Joi = require('joi');

const authSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),

  confirm_password: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),

  access_token: [Joi.string(), Joi.number()],
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  otp:[Joi.string(), Joi.date() , Joi.date()],
});

module.exports = { authSchema };
