const router = require("express").Router();
const {AccountSchema, OTPSchema} = require("./models");
const {
  isEmail,
  sendOTPByMail,
  createAccess,
  createRefresh,
} = require("./utils");
const OTP = require("otp-generator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// account authentication
router
  .route("/auth")
  .get(async (req, res, next) => {
    // login
    let data = req.query,
      user;
    if (!(await isEmail(data.email)))
      return res.status(200).json({status: 400, msg: "Invalid email!"});

    try {
      user = await AccountSchema.findOne({email: data.email});
    } catch (err) {
      return res.status(200).json({status: 400, msg: "Account not found!"});
    }

    if (!(await user)) return res.status(200).json({status: 400, msg: "Account not found!"});

    let match = await bcrypt.compare(data.password, await user.password);
    if (!match) return res.status(200).json({status: 400, msg: "Incorrect password!"});

    if (!(await user.active) || !(await user.verified))
      return res
        .status(200)
        .json({status: 402, msg: "Account verification required!"});

    const access = await createAccess(await user.email),
      refresh = await createRefresh(await user.email);

    return res.status(200).json({status: 200, access, refresh});
  })
  .post(async (req, res, next) => {
    // signup
    let data = req.body,
      user;
    if (!(await isEmail(data.email)))
      return res.status(200).json({status: 400, msg: "Invalid email!"});
    if (data.password.length <= 6 || data.password != data.password2)
      return res.status(200).json({status: 400, msg: "Invalid password!"});
    if (
      (await AccountSchema.find({email: data.email.toLowerCase()})).length > 0
    )
      return res.status(200).json({status: 400, msg: "Account exists!"});

    try {
      let hash = await bcrypt.hash(data.password, saltRounds);
      user = await AccountSchema({
        email: data.email.toLowerCase(),
        password: hash,
      }).save();
    } catch (err) {
      console.log(err);
      return res.status(200).json({status: 500, msg: "Account not created!"});
    }

    try {
      let otp = OTP.generate(8, {
        alphabets: false,
        specialChars: false,
        upperCase: false,
        digits: true,
      });
      await OTPSchema({
        email: user.email,
        otp,
      }).save();
      sendOTPByMail(user.email, otp);
      return res.status(200).json({status: 201, msg: "Account created!"});
    } catch (err) {
      console.log(err);
      return res.status(200).json({status: 502, msg: "Account created! Otp not sent!"});
    }
  })
  .put(async (req, res, next) => {
    // reset password
    let data = req.body;

    if (!(await isEmail(data.email)))
      return res.status(200).json({status: 400, msg: "Invalid email!"});
    if (data.password.length <= 6 || data.password != data.password2)
      return res.status(200).json({status: 400, msg: "Invalid password!"});
    if (!(await AccountSchema.find({email: data.email.toLowerCase()})))
      return res.status(200).json({status: 400, msg: "Account not found!"});

    try {
      let hash = await bcrypt.hash(data.password, saltRounds);
      await AccountSchema.findOneAndUpdate(
        {email: data.email.toLowerCase()},
        {password: hash}
      );
      return res.status(200).json({status: 204, msg: "Password resetted!"});
    } catch (err) {
      return res.status(200).json({status: 500, msg: "Password not resetted!"});
    }
  });

// account verification
router
  .route("/otp")
  .get(async (req, res, next) => {
    let user = await AccountSchema.findOne({email: req.query.email});
    if (!user) return res.status(200).json({status: 404, msg: "Account not found!"});
    let resetOTP = OTP.generate(8, {
        alphabets: false,
        specialChars: false,
        upperCase: false,
        digits: true,
      }),
    genOTP = await OTPSchema({
      email: user.email,
      otp: resetOTP,
    }).save();
    if (!genOTP) return res.status(200).json({status: 500, msg: "OTP not generated!"});

    sendOTPByMail(user.email, resetOTP)
      .then((info) => {
        return res.status(200).json({status: 200, msg: "OTP sent!"});
      })
      .catch((err) => {
        return res.status(200).json({status: 502, msg: "Mail with OTP not sent!"});
      });
  })
  .post(async (req, res, next) => {
    let data = req.body,
      validOTP = await OTPSchema.findOne({email: data.email, otp: data.otp});
    if (!(await validOTP)) {
      return res.status(200).json({status: 400, msg: "Account not found!"});
    }

    if (data.type === "email-verification") {
      let accessTime = new Date().getTime();
      if (accessTime - validOTP.createdAt.getTime() > 86400000) {
        validOTP.delete();
        return res.status(200).json({status: 400, msg: "Otp expired!"});
      }
    } else if (data.type === "reset-password") {
      let accessTime = new Date().getTime();
      if (accessTime - validOTP.createdAt.getTime() > 10000 * 60) {
        validOTP.delete();
        return res.status(200).json({status: 400, msg: "Otp expired!"});
      }
    }
    let user = await AccountSchema.findOneAndUpdate(
      {email: data.email},
      {verified: true, active: true}
    );

    if (!(await user))
      return res
        .status(200)
        .json({status: 500, msg: "Verification status not updated at the moment!"});

    await validOTP.delete();

    return res.status(200).json({status: 200, msg: "OTP verified!"});
  });

module.exports = router;
