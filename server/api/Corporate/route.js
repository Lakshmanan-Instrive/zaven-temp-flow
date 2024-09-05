/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const controller = require("./controller");
const schema = require("./schema");
const checkJwtExpiry = require("../../system/middleware/authentication");

router.post(
  "/",
  celebrate(schema.createCorporate, schema.options),
  c(controller.createCorporate, (req, res, next) => [req.body])
);

router.get(
  "/",
  checkJwtExpiry(["ADMIN", "CP"]),
  c(controller.list, (req, res, next) => [req.query])
);

router.patch(
  "/:id",
  checkJwtExpiry(["ADMIN"]),
  celebrate(schema.updateStatus, schema.options),
  c(controller.updateStatus, (req, res, next) => [req.params.id, req.body])
);

router.get(
  "/profile",
  checkJwtExpiry(["CP"]),
  c(controller.getProfile, (req, res, next) => [req.user])
);

router.get(
  "/user-list",
  checkJwtExpiry(["CP"]),
  c(controller.getUserList, (req, res, next) => [req.query, req.user])
);

router.post(
  "/invite",
  checkJwtExpiry(["CP"], (primary = true)),
  celebrate(schema.invite, schema.options),
  c(controller.invite, (req, res, next) => [req.body, req.user])
);

router.patch(
  "/user/status-update",
  checkJwtExpiry(["CP"], (primary = true)),
  celebrate(schema.userStatus, schema.options),
  c(controller.userStatus, (req, res, next) => [req.body, req.user])
);

module.exports = router;
