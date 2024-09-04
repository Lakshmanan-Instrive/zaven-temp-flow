/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const {
    celebrate
} = require('celebrate');
const c = require('../../system/utils/controller-handler');
const controller = require('./controller');
const schema = require('./schema');

router.post('/', celebrate(schema.create, schema.options), c(controller.create, (req, res, next) => [req.body]));

router.get('/', celebrate(schema.getAllByParams, schema.options), c(controller.getAllByParams, (req, res, next) => [req.query]));

router.get('/asean-name/:asean', celebrate(schema.cityByAsean, schema.options), c(controller.cityByAsean, (req, res, next) => [req.params]));

router.get('/by-asean-id/:aseanId', celebrate(schema.cityByAseanId, schema.options), c(controller.cityByAseanId, (req, res, next) => [req.params]));

router.get('/by-asean-ids', celebrate(schema.cityByAseanIds, schema.options), c(controller.cityByAseanIds, (req, res, next) => [req.query]));

router.get('/by-asean-id-and-type/:aseanId/:type', celebrate(schema.cityByAseanIdAndType, schema.options), c(controller.cityByAseanIdAndType, (req, res, next) => [req.params]));

router.get('/lms-cities/:channelCompanyId', celebrate(schema.lmsCities, schema.options), c(controller.lmsCities, (req, res, next) => [req.params]));

module.exports = router;