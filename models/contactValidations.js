const Joi = require('joi');

const contactSchemaValidation = body => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });
  return Schema.validate(body);
};

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool(),
});

module.exports = {
  contactSchemaValidation,
  favoriteJoiSchema,
};
