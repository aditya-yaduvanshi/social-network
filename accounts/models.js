const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  access: String,
  refresh: String
});

const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});


module.exports = {
  AccountSchema: mongoose.model("Accounts", AccountSchema),
  OTPSchema: mongoose.model("OTPValidation", OTPSchema)
};
