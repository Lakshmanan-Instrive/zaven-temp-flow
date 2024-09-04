const BlockList = require("./index");

// Find a document in the blocklist collection by token
async function findBlockList(token) {
  try {
    const blocklist = await BlockList.findOne({ token });
    return blocklist;
  } catch (error) {
    throw new Error(`Error finding blocklist document: ${error}`);
  }
}

// Create a new document in the blocklist collection with a TTL index
async function createBlockList(token, expirationDate) {
  try {
    const blocklist = new BlockList({
      token,
      expiresAt: expirationDate,
    });
    await blocklist.save();
    return blocklist;
  } catch (error) {
    throw new Error(`Error creating blocklist document: ${error}`);
  }
}

module.exports = {
  findBlockList,
  createBlockList,
};
