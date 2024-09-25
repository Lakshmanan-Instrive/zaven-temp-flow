const boom = require("@hapi/boom");
const RefreshToken = require("./index");
const { ObjectId } = require("mongoose").Types;

const create = async (params) => {
  const { userId, useragent } = params;
  return await RefreshToken.findOneAndUpdate({ userId: new ObjectId(userId), useragent }, params, {
    upsert: true,
    new: true,
  });
};

const findRefreshToken = async (userId, useragent) => {
  return await RefreshToken.findOne({ userId, useragent });
};

module.exports = {
  create,
  findRefreshToken,
};
