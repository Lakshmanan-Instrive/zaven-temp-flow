const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const { dbConn } = require("../../system/db/mongo");

const userSchema = new Schema(
  {
    status: {
      type: Number, // 0 = inactive, 1 = approved,  2 = rejected, 
      default: 0,
      required: true,
    },
    firstName: {
      type: String,
    },
    surName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["LS", "CP", "ADMIN"],
      required: true,
    },
    accessCode: {
      type: String,
    },
    corporateId: {
      type: Schema.Types.ObjectId,
      ref: "corporates",
    },
    legalServiceId: {
      type: Schema.Types.ObjectId,
      ref: "legalServices",
    },
  },
  {
    timestamps: true,
  }
);

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  } else if (this.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

userSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();
  if (update.$set.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(update.$set.password, salt);
    update.$set.password = hash;
  }
  next();
});

const Users = dbConn.model("user", userSchema, "users");

module.exports = Users;
