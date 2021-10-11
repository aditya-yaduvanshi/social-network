import express from "express"

const app = express()
const port = process.env.PORT || 5000
const host = process.env.HOST || "localhost"


app.get("/", async (req,res) => {
  res.send("Express server is ready!")
})



app.listen(port,()=> console.log(`listening on : ${host}:${port}`))