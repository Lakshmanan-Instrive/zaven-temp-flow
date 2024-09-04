const joi = require('celebrate').Joi;

module.exports.options = {
    abortEarly: false,
    convert: true,
    stripUnknown: true,
};

module.exports.create = {
    body: joi.object().keys({
        asean: joi.string().required(),
        name: joi.string().required(),
        type: joi.any().required(),
        serial: joi.number().required(),
        status: joi.number().required(),
    }),
    query: {},
};

module.exports.cityByAsean = {
    body: joi.object().keys({}),
    params: {
        asean: joi.string().required(),
    },
};

module.exports.cityByAseanId = {
    body: joi.object().keys({}),
    params: {
        aseanId: joi.string().required(),
    },
};

module.exports.cityByAseanIds = {
    body: joi.object().keys({}),
    query: {
        aseanIds: joi.string().allow(null, '').required(),
    },
};

module.exports.cityByAseanIdAndType = {
    body: joi.object().keys({}),
    params: {
        aseanId: joi.string().required(),
        type: joi.string().required(),
    },
};

module.exports.getAllByParams = {
    query: joi.object().keys({}),
};

module.exports.lmsCities = {
    body: joi.object().keys({}),
    params: {
        channelCompanyId: joi.string().required(),
    },
};