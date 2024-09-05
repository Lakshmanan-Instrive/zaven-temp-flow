const boom = require("@hapi/boom");
const User = require("./index");
const bcrypt = require("bcrypt");

module.exports = {
  list: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
  aggregation: async (params) => {
    try {
      return await User.aggregate(params);
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
  getUserList: async (page, limit, role, roleId) => {
    try {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      console.log(skip, "skip");
      const [users, totalPages] = await Promise.all([
        User.find({ role, ...roleId })
          .skip(skip)
          .select({ email: 1, firstName: 1, surName: 1, status: 1 })
          .limit(parseInt(limit)),
        User.countDocuments({ role, ...roleId }),
      ]);

      return { users, totalPages };
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
};
