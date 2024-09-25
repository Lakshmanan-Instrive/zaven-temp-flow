const service = require("./service");
const AuthService = require("../Auth/service");
const UserService = require("../User/service");
const boom = require("@hapi/boom");
const utilsChecks = require("../../system/utils/checks");
const sendEmail = require("../../system/utils/send_email");
const {
  createPasswordChangeToken,
  generateUniqueId,
} = require("../../system/utils/access_code_password_change");
const { ObjectId } = require("mongoose").Types;

const createCorporate = async (params) => {
  const { email, firstName, surName } = params;
  const createUser = await AuthService.create({
    email,
    firstName,
    surName,
    role: "CP",
    status: 0,
    primary: true,
  });
  if (!createUser) {
    throw boom.badRequest();
  }
  const { companyName, contactPerson, phoneNumber, companyAddress, zipCode } = params;
  const createdCompany = await service.createCompany({
    companyName,
    contactPerson,
    phoneNumber,
    companyAddress,
    zipCode,
    primaryUserId: createUser._id,
  }); 
  await AuthService.attachCompany({
    userId: createUser._id,
    corporateId: createdCompany._id,
  });

  return createdCompany;
};

const list = async (params) => {
  console.log(params, "params");
  const { page, limit, search, sort, status } = params;
  const { corporates, totalPages } = await service.list(page, limit, search, sort, status);
  const result = {
    message: "Corporate List Fetched",
    detail: { data: corporates, total: totalPages },
  };
  return result;
};

const updateStatus = async (id, params) => {
  console.log(id, params);
  const result = await service.updateStatus(id, params.status);
  if (!result) {
    throw boom.conflict("Company Already in the Same Status");
  }
  if (result._id) {
    let updateUser = await AuthService.statusUpdate(
      { corporateId: result._id, status: 0 },
      {
        status: params.status,
        accessCode: generateUniqueId(),
      }
    );

    if (updateUser.status === 1) {
      let { accessCode, email, firstName, surName } = updateUser;
      const setPasswordLink = await createPasswordChangeToken(email, accessCode);
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
    throw boom.notFound("Company not found");
  }
  return {
    message: "Company Status Updated",
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
        from: "corporates",
        localField: "corporateId",
        foreignField: "_id",
        as: "corporate",
      },
    },
    {
      $unwind: "$corporate",
    },
    {
      $project: {
        _id: 0,
        email: 1,
        firstName: 1,
        surName: 1,
        role: 1,
        "corporate._id": 1,
        "corporate.companyName": 1,
        "corporate.contactPerson": 1,
        "corporate.phoneNumber": 1,
        "corporate.companyAddress": 1,
        "corporate.zipCode": 1,
      },
    },
  ];
  const result = await UserService.aggregation(aggregationPipeline);
  if (!result) {
    throw boom.notFound("Company not found");
  }
  return {
    message: "Company Profile Fetched",
    detail: result,
  };
};

const getUserList = async (params, user) => {
  const { page, limit, search, sort, status } = params;
  const { users, totalPages } = await UserService.getUserList(
    page,
    limit,
    user.role,
    user.roleId,
    search,
    sort,
    status
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
  const role = "CP";
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
    message: "Corporate invited successfully",
  };
  return result;
};

const userStatus = async (params, user) => {
  console.log(params);
  const { status, userId } = params;
  const result = await AuthService.statusUpdate(
    user.roleId.corporateId,
    { status },
    "CP",
    new ObjectId(userId)
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
  createCorporate,
  list,
  updateStatus,
  getProfile,
  getUserList,
  invite,
  userStatus,
};
