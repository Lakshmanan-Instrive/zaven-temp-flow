const boom = require("@hapi/boom");
const Legal_Service = require("./index");

module.exports = {
  create: async (params) => {
    try {
      const legalService = new Legal_Service(params);
      return legalService.save();
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
  list: async (page = 1, limit = 10) => {
    try {
      console.log(page, limit, "page, limit");
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const legalServices = await Legal_Service.find()
        .skip(skip)
        .limit(parseInt(limit));
      const totalPages = await Legal_Service.countDocuments();

      return { legalServices, totalPages };
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },

  updateStatus: async (id, status) => {
    try {
      return await Legal_Service.findOneAndUpdate({ _id: id, status: { $ne: status } }, { status }, { new: true });
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
};
