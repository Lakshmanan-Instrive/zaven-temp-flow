/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");
const checkJwtExpiry = require("../../system/middleware/authentication");

router.post(
  "/",
  checkJwtExpiry(["ADMIN", "LS", "CP"]),
  celebrate(schema.create, schema.options),
  c(controller.create, (req, res, next) => [
    { ...req.body, useragent: req.useragent },
  ])
);

module.exports = router;
