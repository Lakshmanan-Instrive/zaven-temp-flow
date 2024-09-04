const jwt = require("jsonwebtoken");
const { findBlockList } = require("../../api/BlockList/service");

function checkJwtExpiry(accessibleRoles, canInvite) {
  return async(req, res, next) => {
    console.log("check jwt expiry");
    // Get the JWT token from the request headers or cookies
    const token = req.headers.authorization || req?.cookies?.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "No token provided" });
    }

    try {
      // Remove the "Bearer " prefix from the token
      const tokenWithoutPrefix = token.replace("Bearer ", "");
      //Find if the token is in the blocklist
      const checkBlockList = await findBlockList(tokenWithoutPrefix);
      if (checkBlockList) {
        return res
          .status(401)
          .json({ error: "Unauthorized", message: "Token has been revoked" });
      }
            // Verify the JWT token and extract the payload
      const payload = jwt.verify(
        tokenWithoutPrefix,
        process.env.JWT_SECRET_KEY
      );
      if(canInvite){
        if(!payload.data.canInvite){
          return res
          .status(403)
          .json({ error: "forbidden", message: "Permission Denied" });
        }
      }
      console.log("payload", payload, accessibleRoles);
      req.user = payload.data;
      if (!accessibleRoles.includes(payload.data.role)) {
        return res
          .status(403)
          .json({ error: "forbidden", message: "Permission Denied" });
      }

      // Check if the token has expired
      if (payload.exp < Date.now() / 1000) {
        return res
          .status(401)
          .json({ error: "Unauthorized", message: "Token expired" });
      }

      // Token is valid, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log("error", error);
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid token" });
    }
  };
}

module.exports = checkJwtExpiry;
