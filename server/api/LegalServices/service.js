const boom = require("@hapi/boom");
const Legal_Service = require("./index");

const create = async (params) => {
  const legalService = new Legal_Service(params);
  return legalService.save();
};

const list = async (page = 1, limit = 10, search, sort, status) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  let query = {};
  let sortQuery = { createdAt: -1 };
  if (search) {
    search = new RegExp(search, "i");
    query = {
      $text: { $search: search },
    };
  }
  if (status) {
    query.status = parseInt(status);
  }
  if (sort) {
    sort = JSON.parse(sort);
    sortQuery = sort;
  }
  const legalServices = await Legal_Service.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(parseInt(limit));
  const totalPages = await Legal_Service.countDocuments(query);

  return { legalServices, totalPages };
};

const updateStatus = async (id, status) => {
  return await Legal_Service.findOneAndUpdate({ _id: id, status: 0 }, { status }, { new: true });
};

module.exports = {
  create,
  list,
  updateStatus,
};
