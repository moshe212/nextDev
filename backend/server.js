const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { models } = require("./models");
const { mongoFunc } = require("./mongoFunc");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  console.log("UserDetails", req.body);
  models.User.find({ UserName: req.body.userDetails.user_name })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "UserName exist" });
      } else {
        bcrypt.hash(req.body.userDetails.password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            let newUserDetails = {
              UserName: req.body.userDetails.user_name,
              Password: hash,
              Company: "",
              Email_address: req.body.userDetails.email_address,
              First_Name: req.body.userDetails.first_name,
              Last_Name: req.body.userDetails.last_name,
              City: req.body.userDetails.city,
              Country: req.body.userDetails.country,
              Postal_Code: req.body.userDetails.postal_code,
            };
            console.log(newUserDetails);
            const newUser = await mongoFunc
              .AddUser(newUserDetails)
              .then((error, user) => {
                if (error) {
                  res.send(error);
                } else {
                  res.send(user);
                }
              });
          }
        });
      }
    });
});

app.post("/api/LogInUser", async (req, res) => {
  console.log("LogInUser", req.body);
});

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
