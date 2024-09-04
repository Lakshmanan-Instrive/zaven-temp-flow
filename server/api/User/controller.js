const service = require("./service");
const boom = require("@hapi/boom");
const utilsChecks = require("../../system/utils/checks");

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

module.exports = {
  list,
};


