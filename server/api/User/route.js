/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const controller = require("./controller");
const schema = require("./schema");
const checkJwtExpiry = require("../../system/middleware/authentication");


router.get(
  "/",
  checkJwtExpiry,
  c(controller.list, (req, res, next) => [])
);

module.exports = router;
