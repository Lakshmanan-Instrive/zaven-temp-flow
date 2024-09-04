const joi = require("celebrate").Joi;

module.exports.verifyAccessToken = {
  body: joi.object().keys({
    accessCode: joi.string().required(),
    email: joi.string().email().required(),
  }),
};

module.exports.changePassword = {
  body: joi.object().keys({
    email: joi.string().required(),
    accessCode: joi.string().required(),
    password: joi.string().min(6).required(),
  }),
};

module.exports.login = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
};

module.exports.invite = {
  body: joi.object().keys({
    firstName: joi.string().required(),
    surName: joi.string().required(),
    email: joi.string().email().required(),
  }),
};

module.exports.logout = {
  body: joi.object().keys({
    token: joi.string().required(),
  }),
};
