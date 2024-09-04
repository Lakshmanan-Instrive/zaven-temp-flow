/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const controller = require("./controller");
const schema = require("./schema");
const checkJwtExpiry = require("../../system/middleware/authentication");

router.post(
  "/verify",
  celebrate(schema.verifyAccessToken, schema.options),
  c(controller.verifyAccessToken, (req, res, next) => [req.body])
);

router.post(
  "/change-password",
  celebrate(schema.changePassword, schema.options),
  c(controller.changePassword, (req, res, next) => [req.body])
);

router.post(
  "/login",
  celebrate(schema.login, schema.options),
  c(controller.login, (req, res, next) => [req.body])
);

router.post(
  "/invite",
  checkJwtExpiry(["ADMIN"]),
  celebrate(schema.invite, schema.options),
  c(controller.invite, (req, res, next) => [req.body])
);
router.post(
  "/logout",
  checkJwtExpiry(["ADMIN", "LS", "CP"]),
  celebrate(schema.logout, schema.options),
  c(controller.logout, (req, res, next) => [req.body])
);

module.exports = router;
