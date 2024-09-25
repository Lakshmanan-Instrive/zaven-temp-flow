const boom = require("@hapi/boom");
const Corporate = require("./index");

const createCompany = async (params) => {
  try {
    const corporate = new Corporate(params);
    return corporate.save();
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
    const corporates = await Corporate.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));
    const totalPages = await Corporate.countDocuments(query);

    return { corporates, totalPages };
  } catch (error) {
    console.log(error, "error");
    throw boom.badRequest(error);
  }
};

const updateStatus = async (id, status) => {
  try {
    return await Corporate.findOneAndUpdate({ _id: id, status: 0 }, { status }, { new: true });
  } catch (error) {
    console.log(error, "error");
    throw boom.badRequest(error);
  }
};

module.exports = {
  createCompany,
  list,
  updateStatus,
};
