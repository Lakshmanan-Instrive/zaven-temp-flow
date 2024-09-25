const boom = require("@hapi/boom");
const Legal_Service = require("./index");

const create = async (params) => {
  try {
    const legalService = new Legal_Service(params);
    return legalService.save();
  } catch (error) {
    console.log(error, "error");
    throw boom.badRequest(error);
  }
};

const list = async (page = 1, limit = 10, search, sort, status) => {
  try {
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
  } catch (error) {
    console.log(error, "error");
    throw boom.badRequest(error);
  }
};

const updateStatus = async (id, status) => {
  try {
    return await Legal_Service.findOneAndUpdate({ _id: id, status: 0 }, { status }, { new: true });
  } catch (error) {
    console.log(error, "error");
    throw boom.badRequest(error);
  }
};

module.exports = {
  create,
  list,
  updateStatus,
};
