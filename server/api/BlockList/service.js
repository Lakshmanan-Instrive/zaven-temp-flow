const BlockList = require("./index");

// Find a document in the blocklist collection by token
async function findBlockList(token) {
  return await BlockList.findOne({ token });
}

// Create a new document in the blocklist collection with a TTL index
async function createBlockList(token, expirationDate) {
  const blocklist = new BlockList({
    token,
    expiresAt: expirationDate,
  });
  await blocklist.save();
  return blocklist;
}

module.exports = {
  findBlockList,
  createBlockList,
};
