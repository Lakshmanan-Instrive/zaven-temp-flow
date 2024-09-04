const { Schema } = require("mongoose");
const { dbConn } = require("../../system/db/mongo");

const blacklistSchema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Create a TTL index that will automatically remove documents 1 second after their expiration time
blacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const BlacklistedToken = dbConn.model("BlacklistedToken", blacklistSchema);

module.exports = BlacklistedToken;
