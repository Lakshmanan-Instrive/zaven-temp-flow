const boom = require("@hapi/boom");
const service = require("./service");
const {
  generateAccessToken,
} = require("../../system/utils/access_code_password_change");

const create = async (params) => {
  let result = [];
  const { userId, deviceId } = params;

  // Check if there is a refresh token in the database for the given userId and deviceId
  const refreshToken = await service.findRefreshToken(userId, deviceId);

  if (refreshToken) {
    // Generate a new access token using the refresh token
    const accessToken = generateAccessToken(refreshToken);

    // Return the new access token
    result.push(accessToken);
  } else {
    // Handle the case when there is no refresh token in the database
    throw boom.notFound("Refresh token not found");
  }
  return result;
};

module.exports = {
  create,
};
