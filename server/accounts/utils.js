require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (to, urlId) => {
  const testAccount = await nodemailer.createTestAccount(),
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  let info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Socio: Please verify you account",
    text: `Please verify your account by clicking on the link: http://localhost:3000/email-verification?email=${to}&urlId=${urlId}`,
    html: `<p>Please verify your account by clicking on the link: </p><p><a href="${process.env.EMAIL_VERIFY_URL}?email=${to}&urlId=${urlId}">Verify Account</a></p>`,
  });
  console.log("preview : ", nodemailer.getTestMessageUrl(info));
  return info;
};

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
  const testAccount = await nodemailer.createTestAccount(),
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  let info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Socio: Reset Password OTP",
    text: `Please confirm your account by entering OTP: ${otp}`,
    html: `<p>Please confirm your account by entering OTP: ${otp}</p>`,
  });
  console.log("preview : ", nodemailer.getTestMessageUrl(info));
  return info;
}

module.exports = {
  isEmail,
  isPhone,
  sendMail,
  sendOTPByMail
};
