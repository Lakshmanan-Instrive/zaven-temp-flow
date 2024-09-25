const boom = require("@hapi/boom");
const RefreshToken = require("./index");
const { ObjectId } = require("mongoose").Types;

const create = async (params) => {
  try {
    const { userId, useragent } = params;
    return await RefreshToken.findOneAndUpdate(
      { userId: new ObjectId(userId), useragent },
      params,
      { upsert: true, new: true }
    );
  } catch (error) {
    console.log(error, "error");
    throw boom.badRequest(error);
  }
};

const findRefreshToken = async (userId, useragent) => {
  console.log("find refresh token", userId, useragent);
  try {
    return await RefreshToken.findOne({ userId, useragent });
  } catch (error) {
    console.log(error, "error");
    throw boom.badRequest(error);
  }
};

module.exports = {
  create,
  findRefreshToken,
};
