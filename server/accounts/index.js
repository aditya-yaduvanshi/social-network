const router = require("express").Router()
const Accounts = require("./views")


router.get("/login", async (req, res) => {
  let result = await Accounts.get(req.body)
  return res.status(result.status).json(JSON.stringify(result))
})

router.post("/signup", async (req, res) => {
  let result = await Accounts.post(req.body)
  return res.status(result.status).json(JSON.stringify(result))
})


module.exports = router