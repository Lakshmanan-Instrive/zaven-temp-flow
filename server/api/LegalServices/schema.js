const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.create = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    companyName: joi.string().required(),
    contactPerson: joi.string().required(),
    phoneNumber: joi.string().required(),
    companyAddress: joi.string().required(),
    zipCode: joi.string().required(),
  }),
};

module.exports.updateStatus = {
  body: joi.object().keys({
    status: joi.number().required(),
  }),
};

module.exports.invite = {
  body: joi.object().keys({
    firstName: joi.string().required(),
    surName: joi.string().required(),
    email: joi.string().email().required(),
    primary: joi.boolean().required(),
  }),
};

module.exports.userStatus = {
  body: joi.object().keys({
    status: joi.number().required(),
    userId: joi.string().required(),
  }),
};
