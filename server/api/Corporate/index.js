const { Schema } = require("mongoose");
const { dbConn } = require("../../system/db/mongo");

const corporateSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    primaryUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: Number, // 0 = inactive, 1 = active
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

corporateSchema.index({
  companyName: "text",
  contactPerson: "text",
  companyAddress: "text",
  zipCode: "text",
  phoneNumber: "text",
});

const Corporate = dbConn.model("corporate", corporateSchema, "corporates");

module.exports = Corporate;
