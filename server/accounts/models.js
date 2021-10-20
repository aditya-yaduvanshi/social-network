const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
});

const TempUser = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});


module.exports = {
  AccountSchema: mongoose.model("Accounts", AccountSchema),
  TempUser: mongoose.model("TempUser", TempUser),
  OTPSchema: mongoose.model("OTPValidation", OTPSchema)
};
