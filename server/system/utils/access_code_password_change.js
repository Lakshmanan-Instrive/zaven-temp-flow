const { encrypt } = require("./crypto");
const uuid = require("uuid");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const createPasswordChangeToken = async (email, accessCode) => {
  console.log(email, accessCode, "email, accessCode");
  const encodedEmail = encodeURIComponent(encrypt(email));
  const encodedAccessToken = encodeURIComponent(encrypt(accessCode));
  const url = `${process.env.WEB_URL}/change-password?email=${encodedEmail}&accessCode=${encodedAccessToken}`;
  return url;
};

const generateAccessToken = async (params) => {
  const { data, expiresIn } = params;
  const payload = {
    data,
    iat: moment().unix(),
    exp: moment().add(expiresIn, "hour").unix(),
  };
  console.log(payload, "payload");
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = await jwt.sign(payload, secretKey);
  return token;
};

const generateUniqueId = () => uuid.v4();

module.exports = {
  createPasswordChangeToken,
  generateAccessToken,
  generateUniqueId,
};
