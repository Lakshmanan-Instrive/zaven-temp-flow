const service = require("./service");
const AuthService = require("../Auth/service");
const UserService = require("../User/service");
const boom = require("@hapi/boom");
const { ObjectId } = require("mongoose").Types;
const sendEmail = require("../../system/utils/send_email");
const {
  createPasswordChangeToken,
} = require("../../system/utils/access_code_password_change");

const create = async (params) => {
  console.log(params);
  const getUser = await AuthService.getUser({
    status: 0,
    email: params.email,
    role: "LS",
    legalServiceId: {
      $exists: false,
    },
  });
  if (!getUser) {
    throw boom.conflict("User Already Assigned to Legal Service or Not Found");
  }
  const legalService = await service.create(params);

  if (!legalService) {
    throw boom.badRequest();
  }
  if (legalService._id) {
    await AuthService.attachLegalService({
      email: params.email,
      legalServiceId: legalService._id,
    });
  }
  const result = {
    message: "Legal Service created successfully Waiting for admin approval",
    detail: legalService,
  };
  return result;
};

const list = async (params) => {
  console.log(params, "params");
  const { page, limit } = params;
  const { legalServices, totalPages } = await service.list(page, limit);
  const result = {
    message: "Legal Service List Fetched",
    detail: { data: legalServices, total: totalPages },
  };
  return result;
};

const updateStatus = async (id, params) => {
  console.log(id, params);
  const result = await service.updateStatus(id, params.status);
  if (!result) {
    throw boom.conflict("Legal Service Already in the Same Status");
  }
  if (result._id) {
    let updateUser = await AuthService.statusUpdate(
      result._id,
      { status: params.status },
      "LS"
    );

    if (updateUser.status === 1) {
      let { accessCode, email, firstName, surName } = updateUser;
      const setPasswordLink = await createPasswordChangeToken(
        email,
        accessCode
      );
      await sendEmail({
        email: email,
        subject: "Password Change Request",
        message: `Hi ${firstName} ${surName},<br><br>
          You have requested for a set password. Please click the link below to change your password.<br><br>
          ${setPasswordLink}`,
      });
    }
  }
  if (!result) {
    throw boom.notFound("Legal Service not found");
  }
  return {
    message: "Legal Service Status Updated",
    detail: result,
  };
};

const getProfile = async (params) => {
  const userId = params._id;
  console.log(userId, "userId");
  const aggregationPipeline = [
    {
      $match: {
        _id: ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "legal_services",
        localField: "legalServiceId",
        foreignField: "_id",
        as: "legalService",
      },
    },
    {
      $unwind: "$legalService",
    },
    {
      $project: {
        _id: 0,
        email: 1,
        firstName: 1,
        surName: 1,
        role: 1,
        "legalService._id": 1,
        "legalService.companyName": 1,
        "legalService.contactPerson": 1,
        "legalService.phoneNumber": 1,
        "legalService.companyAddress": 1,
        "legalService.zipCode": 1,
      },
    },
  ];
  const result = await UserService.aggregation(aggregationPipeline);
  if (!result) {
    throw boom.notFound("Company not found");
  }
  return {
    message: "Legal Service Profile Fetched",
    detail: result,
  };
};

const getUserList = async (params, user) => {
  const { page, limit } = params;
  const { users, totalPages } = await UserService.getUserList(
    page,
    limit,
    user.role
  );
  const result = {
    message: "Legal Service List Fetched",
    detail: { data: users, total: totalPages },
  };
  return result;
};

module.exports = {
  create,
  list,
  updateStatus,
  getProfile,
  getUserList,
};
