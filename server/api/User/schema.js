const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.changePassword = {
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
  confirmPassword: joi.string().required(),
};
