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

  changePassword: async (data) => {
    try {
      const { userId, currentPassword, newPassword } = data;

      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        throw boom.notFound("User not found");
      }

      // Compare the current password with the one stored in the database
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        throw boom.badRequest("Invalid current password");
      }

      // Update the user's password
      user.password = newPassword;
      await user.save();

      return user;
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
};
