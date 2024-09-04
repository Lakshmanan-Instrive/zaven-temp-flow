const boom = require("@hapi/boom");
const Corporate = require("./index");

module.exports = {
  createCompany: async (params) => {
    try {
      const corporate = new Corporate(params);
      return corporate.save();
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
  list: async (page = 1, limit = 10) => {
    try {
      console.log(page, limit, "page, limit");
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const corporates = await Corporate.find()
        .skip(skip)
        .limit(parseInt(limit));
      const totalPages = await Corporate.countDocuments();

      return { corporates, totalPages };
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      return await Corporate.findOneAndUpdate(
        { _id: id, status: { $ne: status } },
        { status },
        { new: true }
      );
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
};
