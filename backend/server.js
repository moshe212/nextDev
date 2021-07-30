const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { models } = require("../models");
const { mongoFunc } = require("../mongoFunc");

dotenv.config();
app.use(bodyParser.json());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

let Mongo_Path = process.env.Mongo_Path;

function connectToDB() {
  const connection = mongoose.connect(Mongo_Path, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  return connection;
}

app.post("/api/RegisterUser", async (req, res) => {
  console.log("SaveTaskConfiguration", req.body);
  let newUserDetails = {
    UserName: req.body.UserName,
    Password: req.body.Password,
  };
  console.log(newUserDetails);
  const newUser = await mongoFunc.AddUser(newUserDetails);
  res.send(newUser);
});

app.post("/api/LogInUser", async (req, res) => {});

app.post("/api/LogOutUser", async (req, res) => {});

app.get("*", (req, res) => {
  console.log("*", req.body);
  res.send("root");
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
});
