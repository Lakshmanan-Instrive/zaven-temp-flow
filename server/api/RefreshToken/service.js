const boom = require("@hapi/boom");
const RefreshToken = require("./index");

module.exports = {
  create: async (params) => {
    try {
      const refreshToken = new RefreshToken(params);
      return refreshToken.save();
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
  findRefreshToken: async (userId, deviceId) => {
    try {
      return await RefreshToken.findOne({ userId, deviceId });
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
};
