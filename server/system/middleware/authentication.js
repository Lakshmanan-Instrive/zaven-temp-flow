const jwt = require("jsonwebtoken");
const { findBlockList } = require("../../api/BlockList/service");
const cacheInstance = require("../utils/cache_reset_password");

function checkJwtExpiry(accessibleRoles, primary) {
  return async (req, res, next) => {
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
      console.log("payload", payload.data._id, payload.data.generatedDate);
      if (payload.data.generatedDate) {
        let cacheData = await cacheInstance.retrieve(
          payload.data._id,
          payload.data.generatedDate,
          payload.data.uniqueId
        );
        if (cacheData) {
          return res.status(401).json({
            error: "Unauthorized",
            message: "Password updated by someone",
          });
        }
      }
      if (primary) {
        if (!payload.data.primary) {
          return res
            .status(403)
            .json({ error: "forbidden", message: "Permission Denied" });
        }
      }
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
