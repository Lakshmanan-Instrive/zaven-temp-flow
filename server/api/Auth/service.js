const boom = require("@hapi/boom");
const User = require("../User/index");

const { generateUniqueId } = require("../../system/utils/access_code_password_change");

const verifyAccess = async (params) => {
  return await User.findOne({
    accessCode: params.accessCode,
    email: params.email,
    status: params.status,
  });
};

const changePassword = async (params) => {
  return await User.updateOne(
    {
      accessToken: params.accessToken,
      email: params.email,
    },
    {
      $set: { password: params.password },
    }
  );
};

const login = async (email) => {
  return await User.findOne({ email });
};

const attachLegalService = async (params) => {
  return await User.updateOne(
    { email: params.email, status: 0 },
    { $set: { legalServiceId: params.legalServiceId, status: 2 } }
  );
};

const attachCompany = async (params) => {
  return await User.updateOne(
    { _id: params.userId },
    { $set: { corporateId: params.corporateId } }
  );
};

const create = async (params) => {
  const user = new User(params);
  return user.save();
};

const statusUpdate = async (match, update) => {
  return await User.findOneAndUpdate(
    match,
    {
      $set: update,
    },
    { new: true }
  );
};

const getUser = async (params) => {
  return await User.findOne(params);
};

module.exports = {
  verifyAccess,
  changePassword,
  login,
  attachLegalService,
  attachCompany,
  create,
  statusUpdate,
  getUser,
};
