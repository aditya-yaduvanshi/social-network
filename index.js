require("dotenv").config();
const express = require("express"),
  path = require('path'),
  cors = require("cors"),
  mongoose = require("mongoose"),
  accounts = require("./accounts");

process.on("unhandledRejection", (err) => console.log(err));

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";
const mongodb_uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use("/static", express.static(path.join(__dirname, 'web/build/static')));
app.use(express.static(path.join(__dirname, 'web/build')));

// api routes
app.use("/api/accounts", accounts);

try {
  mongoose
    .connect(mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB is connected.");
      app.listen(port, () =>
        console.log(`Server is running at - ${host}:${port}`)
      );
    });
} catch (err) {
  console.error("ERROR : ", err);
  console.log("exiting now...done.");
  process.exit(1);
}
