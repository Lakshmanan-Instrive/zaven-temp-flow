const boom = require("@hapi/boom");
const Corporate = require("./index");

const createCompany = async (params) => {
  const corporate = new Corporate(params);
  return corporate.save();
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
  const corporates = await Corporate.find(query).sort(sortQuery).skip(skip).limit(parseInt(limit));
  const totalPages = await Corporate.countDocuments(query);

  return { corporates, totalPages };
};

const updateStatus = async (id, status) => {
  return await Corporate.findOneAndUpdate({ _id: id, status: 0 }, { status }, { new: true });
};

module.exports = {
  createCompany,
  list,
  updateStatus,
};
