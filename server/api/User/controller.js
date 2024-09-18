const service = require("./service");
const boom = require("@hapi/boom");
const cacheInstance = require("../../system/utils/cache_reset_password");

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
  changePassword,
};
