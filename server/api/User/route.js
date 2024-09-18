/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const controller = require("./controller");
const schema = require("./schema");
const checkJwtExpiry = require("../../system/middleware/authentication");

router.patch(
  "/change-password",
  checkJwtExpiry(["LS", "CP", "ADMIN"]),
  celebrate({ body: schema.changePassword }),
  c(controller.changePassword, (req, res, next) => [req.body, req.user])
);
module.exports = router;
