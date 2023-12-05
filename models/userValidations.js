const joi = require("joi");

const userSchemeValidation = (body) => {
	const Scheme = joi.object({
		email: joi.string().email().required(),
		password: joi.string().required(),
		subscription: joi.string().valid("starter", "pro", "business"),
	});
	return Scheme.validate(body);
};

const patchUserSchemeValidation = (body) => {
	const Scheme = joi.object({
		subscription: joi.string().valid("starter", "pro", "business"),
	});
	return Scheme.validate(body);
};

module.exports = {
	userSchemeValidation,
	patchUserSchemeValidation,
};
