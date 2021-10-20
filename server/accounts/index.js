const router = require("express").Router();
const {AccountSchema, TempUser, OTPSchema} = require("./models");
const {isEmail, sendMail, sendOTPByMail} = require("./utils");
const OTP = require("otp-generator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// login
router.get("/auth", async (req, res, next) => {
  let data = req.query,
    user;
  try {
    if (!(await isEmail(data.email))) return res.sendStatus(400);
    user = await AccountSchema.findOne({
      email: data.email,
    });

    if (!user) return res.sendStatus(400);

    let match = bcrypt
      .compare(data.password, user.password)
      .then((result) => result);

    if (!match) return res.sendStatus(400);

    if (!user.active || !user.verified) {
      return res.status(200).json({
        status: 403,
        msg: "Verification required!",
      });
    }

    return res.status(200).json({
      access: "bwjbyu678er82ijbwehgfvewe",
      refresh: "sa12t7vbhbdvimskdnhudg6we",
    });
  } catch (err) {
    return res.sendStatus(502);
  }
});
// signup
router.post("/auth", async (req, res, next) => {
  let data = req.body;
  try {
    if (
      (await isEmail(data.email)) &&
      data.name &&
      data.password.length >= 6 &&
      data.password === data.password2
    ) {
      let hash = await bcrypt.hash(data.password, saltRounds),
        user = await AccountSchema({
          name: data.name,
          email: data.email,
          password: await hash,
        }).save(),
        urlId = OTP.generate(8),
        tempUser = await TempUser({
          email: data.email,
          urlId,
        }).save();
      if (tempUser && user) {
        sendMail(data.email, urlId)
          .then((info) => info)
          .catch((err) => console.log(err));
        return res.sendStatus(201);
      }
    } else return res.sendStatus(400);
  } catch (err) {
    return res.sendStatus(400);
  }
});

// reset password
router.get("/otp", async (req, res, next) => {
  let user = await AccountSchema.findOne({email: req.query.email}),
    resetOTP = OTP.generate(8, {alphabets: false, specialChars: false, upperCase: false, digits: true});
  if (!user) return res.sendStatus(404);
  let genOTP = await OTPSchema({
    email: user.email,
    otp: resetOTP
  }).save();
  if(!genOTP) return res.sendStatus(502)

  sendOTPByMail(user.email, resetOTP)
  .then(info => {
    return res.sendStatus(200);
  })
  .catch(err => {
    return res.sendStatus(502)
  })
});

router.post("/otp", async (req, res, next) => {
  let data = req.body,
  validOTP = await OTPSchema.findOne({email: data.email, otp: data.otp})
  if(!(await validOTP)) {
    return res.sendStatus(404);
  }

  let accessTime = new Date().getTime()
  if((accessTime - validOTP.createdAt.getTime()) > 5000*60){
    return res.sendStatus(400)
  }
  
  if(Number(validOTP.otp) !== Number(data.otp)) {
    return res.sendStatus(400)
  }
  
  await validOTP.delete()

  return res.sendStatus(200)
})

router.post("/reset-password", async (req, res, next) => {
  let data = req.body,
    user;
  try {
    if (!(await isEmail(data.email)) || 
      data.password.length < 6 ||
      data.password !== data.password2
    ) return res.sendStatus(400)

    let hash = await bcrypt.hash(data.password, saltRounds)
    user = await AccountSchema.findOneAndUpdate({email: data.email},{password: hash})
    if(!(await user)) return res.sendStatus(404);

    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(502);
  }
});

// email verification
router.put("/verify-email", async (req, res, next) => {
  let data = req.body,
    user;
  try {
    user = await TempUser.findOneAndDelete({
      email: data.email,
      urlId: data.urlId,
    });
    if (!user) return res.sendStatus(404);
    if (new Date().getTime() - user.createdAt.getTime() > 86400000) {
      return res.sendStatus(400);
    }

    if (await user.delete()) {
      let verifiedUser = await AccountSchema.findOneAndUpdate(
        {email: data.email},
        {verified: true, active: true}
      );
      if (!verifiedUser) return res.sendStatus(502);

      return res.sendStatus(200);
    }
  } catch (err) {
    return res.sendStatus(502);
  }
});

router.get("/verify-email", async (req, res, next) => {
  let email = req.query.email;
  try {
    let resetOTP = OTP.generate(8),
      tempUser = await TempUser.findOneAndUpdate({email}, {urlId: resetOTP}),
      info = await sendMail(email, resetOTP);
    if (tempUser && info) return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(404);
  }
});

module.exports = router;
