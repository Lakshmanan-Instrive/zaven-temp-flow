const boom = require("@hapi/boom");
const service = require("./service");
const AuthService = require("../Auth/service");
const UserService = require("../User/service");
const { ObjectId } = require("mongoose").Types;
const sendEmail = require("../../system/utils/send_email");
const { createPasswordChangeToken } = require("../../system/utils/access_code_password_change");
const { generateUniqueId } = require("../../system/utils/access_code_password_change");

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
  const { page, limit, search, sort, status } = params;
  const { legalServices, totalPages } = await service.list(page, limit, search, sort, status);
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
    const updateUser = await AuthService.statusUpdate(result._id, { status: params.status }, "LS");

    if (updateUser.status === 1) {
      const { accessCode, email, firstName, surName } = updateUser;
      const setPasswordLink = await createPasswordChangeToken(email, accessCode);
      await sendEmail({
        email,
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
  const { page, limit, search, filter, sort } = params;
  const { users, totalPages } = await UserService.getUserList(
    page,
    limit,
    user.role,
    user.roleId,
    search,
    sort,
    filter
  );
  const result = {
    message: "Legal Service List Fetched",
    detail: { data: users, total: totalPages },
  };
  return result;
};

const invite = async (params, user) => {
  console.log(params);
  const { email, firstName, surName, primary } = params;
  const role = "LS";
  const accessCode = generateUniqueId();

  const userCreated = await AuthService.create({
    email,
    firstName,
    surName,
    accessCode,
    role,
    ...user.roleId,
    status: 1,
    primary,
  });

  if (userCreated.status === 1) {
    const { accessCode, email, firstName, surName } = userCreated;
    const setPasswordLink = await createPasswordChangeToken(email, accessCode);
    await sendEmail({
      email,
      subject: "Password Change Request",
      message: `Hi ${firstName} ${surName},<br><br>
          You have requested for a set password. Please click the link below to change your password.<br><br>
          ${setPasswordLink}`,
    });
  }
  const result = {
    message: "Legal Service invited successfully",
  };
  return result;
};

const userStatus = async (params, user) => {
  console.log(params);
  const { status, userId } = params;
  const result = await AuthService.statusUpdate(
    { legalServiceId: user.roleId.legalServiceId, _id: userId },

    { status }
  );
  if (!result) {
    throw boom.notFound("User not found");
  }
  return {
    message: "User Status Updated",
    detail: result,
  };
};

module.exports = {
  create,
  list,
  updateStatus,
  getProfile,
  getUserList,
  invite,
  userStatus,
};
