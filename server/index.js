require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const accounts = require("./accounts")

process.on("unhandledRejection", (err) => console.log(err))

const app = express()
const port = process.env.PORT || 5000
const host = process.env.HOST || "localhost"
const mongodb_uri = process.env.MONGODB_URI


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get("/", async (req,res) => {
  res.send("Express server is ready!")
})
app.use("api/accounts", accounts)



try {
  mongoose.connect(mongodb_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB is connected.")
    app.listen(port,()=>console.log(`Server is running at - ${host}:${port}`))
  })
} catch (err) {
  console.error("ERROR : ", err)
  console.log('exiting now...done.')
  process.exit(1)
}