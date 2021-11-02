require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const AUTH_USER = process.env.AUTH_USER;
const AUTH_PASS = process.env.AUTH_PASS;


const isEmail = async (email) => {
  let mail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return mail.test(String(email).toLowerCase());
};

const isPhone = async (phone) => {
  let num = /^\d{10}$/;
  return num.test(String(phone).toLowerCase());
};

const sendOTPByMail = async (to, otp) => {
  /*const testAccount = await nodemailer.createTestAccount(),
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });*/
  const transporter = nodemailer.createTransport({
      service: "hotmail",
      host: "smtp-mail.outlook.com",
      secure: false,
      port: 587,
      auth: {
          user: AUTH_USER,
          pass: AUTH_PASS
      }
  });
  let info = await transporter.sendMail({
    from: process.env.AUTH_USER,
    to: to,
    subject: "Socio: Confirm OTP",
    text: `Please confirm your account by entering OTP: ${otp}`,
    html: `<p>Please confirm your account by entering OTP: ${otp}</p>`,
  });
  console.log("preview : ", nodemailer.getTestMessageUrl(info));
  return info;
}

const createAccess = async (email) => {
  let access = jwt.sign({email}, jwtAccessSecret, {expiresIn: "2h"});
  return access;
}

const verifyAccess = async (access) => {
  let result = jwt.verify(access, jwtAccessSecret);
  return result;
}

const createRefresh = async (email) => {
  let refresh = jwt.sign({email}, jwtRefreshSecret, {expiresIn: "12h"});
  return refresh;
}

const verifyRefresh = async (refresh) => {
  let result = jwt.verify(refresh, jwtRefreshSecret);
  return result;
}

module.exports = {
  isEmail,
  isPhone,
  sendOTPByMail,
  createAccess,
  verifyAccess,
  createRefresh,
  verifyRefresh
};
