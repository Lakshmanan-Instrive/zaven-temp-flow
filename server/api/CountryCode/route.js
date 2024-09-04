/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const {
    celebrate
} = require('celebrate');
const c = require('../../system/utils/controller-handler');
const controller = require('./controller');
const schema = require('./schema');

router.get('/', celebrate(schema.getAllByParams, schema.options), c(controller.getAllByParams, (req, res, next) => [req.query]));

module.exports = router;