const Joi = require('joi');
const { Schema, model } = require('mongoose');

const codeEmail = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(codeEmail).required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool(),
});

const Contact = model('Contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
