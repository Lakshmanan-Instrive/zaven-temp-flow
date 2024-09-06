const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const service = require("./service");
const { createBlockList } = require("../BlockList/service");
const sendEmail = require("../../system/utils/send_email");
const { decrypt } = require("../../system/utils/crypto");
const {
  generateAccessToken,
  generateUniqueId,
} = require("../../system/utils/access_code_password_change");

const getTokenExpiryTime = async (token) => {
  const decodedToken = jwt.decode(token);
  if (!decodedToken || !decodedToken.exp) {
    throw new Error("Invalid token");
  }
  return new Date(decodedToken.exp * 1000); // Convert Unix timestamp to JavaScript Date
};

const verifyAccessToken = async (params) => {
  const result = {};
  const { accessCode, email } = params;
  const verified = await service.verifyAccess({ accessCode, email, status: 0 });
  console.log(verified, "verified");
  if (verified) {
    // const setPasswordLink = await createPasswordChangeToken(
    //   verified.email,
    //   verified.accessCode
    // );
    // await sendEmail({
    //   email: verified.email,
    //   subject: "Password Change Request",
    //   message: `Hi ${verified.firstName} ${verified.surName},<br><br>
    //     You have requested for a set password. Please click the link below to change your password.<br><br>
    //     ${setPasswordLink}`,
    // });
    result.message = "Access Code verified successfully";
  } else {
    throw boom.notFound("Invalid Access Code");
  }
  return result;
};

const changePassword = async (params) => {
  const result = {};
  let { accessCode, email, password } = params;
  console.log(accessCode, email, password, "accessCode, email, password");
  accessCode = decrypt(accessCode);
  email = decrypt(email);
  console.log(accessCode, email, "accessCode, email");
  const verified = await service.verifyAccess({ accessCode, email, status: 1 });
  if (verified) {
    const setPassword = await service.changePassword({
      accessCode,
      email,
      password,
    });
    if (setPassword) {
      result.message = "Password updated successfully";
    } else {
      result.message = "Error while changing the password please try again";
    }
  } else {
    throw boom.notFound("Invalid URL for Change password");
  }

  return result;
};

const login = async (params) => {
  const result = {};
  const { email, password } = params;
  const userData = await service.login({ email, password });
  if (userData) {
    let roleId = {};
    if (userData.role == "CP") {
      roleId.corporateId = userData.corporateId;
    } else if (userData.role == "LS") {
      roleId.legalServiceId = userData.legalServiceId;
    } else {
      roleId.admin = null;
    }
    const accessToken = await generateAccessToken({
      data: {
        email: userData.email,
        role: userData.role,
        firstName: userData.firstName,
        surName: userData.surName,
        _id: userData._id,
        roleId,
        primary: userData.primary || false,
        generatedDate: Date.now(),
        uniqueId: generateUniqueId(),
      },
      expiresIn: 1,
    });
    const session = {
      accessToken,
      email: userData.email,
      role: userData.role,
    };
    result.session = session;
  } else {
    throw boom.unauthorized("Invalid email or password");
  }
  return result;
};

const invite = async (params) => {
  console.log(params);
  const { email, firstName, surName } = params;
  const role = "LS";
  const accessCode = generateUniqueId();

  const userCreated = await service.create({
    email,
    firstName,
    surName,
    accessCode,
    role,
    primary: true,
  });

  if (userCreated) {
    await sendEmail({
      email,
      subject: "Legal Services Invitation",
      message: `Hi ${firstName} ${surName},<br><br>
      You have been invited to join Zaven Legal Services. Please use the below access code to login.<br><br> ${accessCode}`,
    });
  }
  const result = {
    message: "Legal Service invited successfully",
    detail: userCreated,
  };
  return result;
};

const logout = async (params) => {
  const result = {};
  const { token } = params;
  const expiresAt = await getTokenExpiryTime(token);
  // const expiresAt = new Date(Date.now() + 60000); // 1 minute from now

  const blocklist = await createBlockList(token, expiresAt);
  if (blocklist) {
    result.message = "User logged out successfully";
  } else {
    throw boom.badRequest("Error while logging out");
  }
  return result;
};

module.exports = {
  verifyAccessToken,
  changePassword,
  login,
  invite,
  logout,
};
