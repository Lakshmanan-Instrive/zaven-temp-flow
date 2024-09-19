const { Schema } = require("mongoose");
const { dbConn } = require("../../system/db/mongo");

const legalServiceSchema = new Schema(
  {
    companyName: {
      type: String,
    },
    status: {
      type: Number, // 0 = pending, 1 = active, 2 = inactive
      default: 0,
      required: true,
    },
    contactPerson: {
      type: String,
    },
    accessCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    primaryUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

legalServiceSchema.index({
  companyName: "text",
  contactPerson: "text",
  companyAddress: "text",
  zipCode: "text",
  phoneNumber: "text",
});

const Legal_Service = dbConn.model(
  "legal_service",
  legalServiceSchema,
  "legal_services"
);

module.exports = Legal_Service;
