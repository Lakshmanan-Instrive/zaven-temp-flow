const { Schema } = require("mongoose");
const { dbConn } = require("../../system/db/mongo");

const refreshTokenSchema = new Schema(
  {
    useragent: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a TTL index that will automatically remove documents 1 second after their expiration time
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = dbConn.model("RefreshToken", refreshTokenSchema, "refresh_tokens");

module.exports = RefreshToken;
