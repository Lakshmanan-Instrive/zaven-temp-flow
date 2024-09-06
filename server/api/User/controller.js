const service = require("./service");
const boom = require("@hapi/boom");
const utilsChecks = require("../../system/utils/checks");
const cacheInstance = require("../../system/utils/cache_reset_password");

const list = async () => {
  const getList = await service.list();
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Legal Service Found");
  }
  const result = {
    message: "User List Fetched",
    detail: getList,
  };
  return result;
};

const changePassword = async (params, user) => {
  let data = {
    userId: user._id,
    currentPassword: params.oldPassword,
    newPassword: params.newPassword,
  };
  if (params.newPassword !== params.confirmPassword) {
    throw boom.badRequest("Password and Confirm Password do not match");
  }
  const changePassword = await service.changePassword(data);
  if (!changePassword) {
    throw boom.badRequest("Password Change Failed");
  }
  await cacheInstance.push(user._id, user.uniqueId);
  const result = {
    message: "Password Changed Successfully",
  };
  return result;
};

module.exports = {
  list,
  changePassword,
};
