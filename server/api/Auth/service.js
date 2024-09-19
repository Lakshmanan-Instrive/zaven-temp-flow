const boom = require("@hapi/boom");
const User = require("../User/index");
const bcrypt = require("bcrypt");
const {
  generateUniqueId,
} = require("../../system/utils/access_code_password_change");

module.exports = {
  verifyAccess: async (params) => {
    try {
      return await User.findOne({
        accessCode: params.accessCode,
        email: params.email,
        status: params.status,
      });
    } catch (error) {
      console.log(error, "error");
      throw boom.notFound("Invalid Access Code");
    }
  },
  changePassword: async (params) => {
    try {
      return await User.updateOne(
        {
          accessToken: params.accessToken,
          email: params.email,
        },
        {
          $set: { password: params.password },
        }
      );
    } catch (error) {
      console.log(error, "error");
      throw boom.notFound(
        "Invalid URL, Use this URL You can't Reset Your Password"
      );
    }
  },

  login: async (params) => {
    try {
      const { email, password } = params;
      console.log(email, password, "email, password");
      const user = await User.findOne({ email });
      console.log(!user, "user");
      if (!user) {
        throw boom.unauthorized(
          "Invalid Email or Password, If valid please wait for the approval"
        );
      }
      console.log(password, user.password, "password, user.password");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized("Invalid Email or Password");
      }
      return user;
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
  attachLegalService: async (params) => {
    try {
      return await User.updateOne(
        { email: params.email, status: 0 },
        { $set: { legalServiceId: params.legalServiceId, status: 2 } }
      );
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
  attachCompany: async (params) => {
    try {
      return await User.updateOne(
        { _id: params.userId },
        { $set: { corporateId: params.corporateId } }
      );
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },

  create: async (params) => {
    try {
      const user = new User(params);
      return user.save();
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },

  statusUpdate: async (id, update, type, userId) => {
    try {
      let match = {
        status: 0,
      };
      if (type === "CP") {
        match = { ...match, corporateId: id };
      } else {
        match = { ...match, legalServiceId: id };
      }
      if (userId) {
        match = { ...match, _id: userId };
      }
      const updatedUser = await User.findOneAndUpdate(
        match,
        {
          $set: update,
        },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },

  getUser: async (params) => {
    try {
      return await User.findOne(params);
    } catch (error) {
      console.log(error, "error");
      throw boom.badRequest(error);
    }
  },
};
