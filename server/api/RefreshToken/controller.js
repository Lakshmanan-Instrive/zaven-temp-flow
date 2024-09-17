const boom = require("@hapi/boom");
const service = require("./service");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
const {
  generateAccessToken,
} = require("../../system/utils/access_code_password_change");

const create = async (params) => {
  console.log("create refresh token");
  let result;
  const { userId, useragent } = params;

  // Check if there is a refresh token in the database for the given userId and deviceId
  const refreshToken = await service.findRefreshToken(
    new ObjectId(userId),
    useragent.source
  );
  console.log("refreshToken", refreshToken);
  if (refreshToken) {
    // Decode the refresh token
    const payload = jwt.verify(
      refreshToken.refreshToken,
      process.env.JWT_SECRET_KEY
    );
    console.log("payload", payload);
    if (!payload || payload.exp < Date.now() / 1000) {
      throw boom.unauthorized("Refresh token expired");
    } else {
      // Generate a new access token

      const accessToken = await generateAccessToken({
        data: payload.data,
        expiresIn: 1,
      });
      console.log("accessToken", accessToken);
      result = { accessToken };
    }
  } else {
    // Handle the case when there is no refresh token in the database
    throw boom.unauthorized("Refresh token expired");
  }
  return result;
};

module.exports = {
  create,
};
