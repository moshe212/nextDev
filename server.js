const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const checkauth = require("./middleware/CheckAuth");
const { models } = require("./models");
const { mongoFunc } = require("./mongoFunc");
const cors = require("cors");
const path = require("path");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { result } = require("lodash");

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));

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
              About_Me: "",
            };
            console.log(newUserDetails);
            const newUser = await mongoFunc
              .AddUser(newUserDetails)
              .then((error, user) => {
                if (error) {
                  res.status(500).json({ error: err });
                } else {
                  res.send(user);
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.post("/api/LogInUser", async (req, res) => {
  console.log("LogInUser", req.body);
  models.User.find({ UserName: req.body.userDetails.user_name })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth faild" });
      }
      bcrypt.compare(
        req.body.userDetails.password,
        user[0].Password,
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(401).json({ message: "Auth faild" });
          }
          if (result) {
            const token = jwt.sign(
              { username: user[0].User_Name, userId: user[0]._id },
              process.env.JWT_KEY,
              { expiresIn: "1h" }
            );
            const user_details = {
              UserName: user[0].UserName,
              Company: user[0].Company,
              Email_address: user[0].Email_address,
              First_Name: user[0].First_Name,
              Last_Name: user[0].Last_Name,
              City: user[0].City,
              Country: user[0].Country,
              Postal_Code: user[0].Postal_Code,
              About_Me: user[0].About_Me,
              Token: token,
            };
            return res.status(200).json({
              message: "Auth successful",
              // token: token,
              userdetails: user_details,
            });
          } else {
            return res.status(400).json({ message: "Invalid details" });
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.post("/api/LogOutUser", checkauth, async (req, res) => {
  console.log(req.body);
});

app.post("/api/UpdateProfile", checkauth, async (req, res) => {
  console.log(req.body);

  const query = { UserName: req.body.userDetails.user_name };
  const update = {
    Email_address: req.body.userDetails.email_address,
    First_Name: req.body.userDetails.first_name,
    Last_Name: req.body.userDetails.last_name,
    City: req.body.userDetails.city,
    Country: req.body.userDetails.country,
    Postal_Code: req.body.userDetails.postal_code,
    About_Me: req.body.userDetails.about_me,
  };
  models.User.findOneAndUpdate(
    query,
    update,
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Can not update", err);
        return res.status(500).json({ error: err });
      }
      console.log(doc);
      const token = jwt.sign(
        { username: doc.User_Name, userId: doc._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      const user_details = {
        UserName: doc.UserName,
        Company: doc.Company,
        Email_address: doc.Email_address,
        First_Name: doc.First_Name,
        Last_Name: doc.Last_Name,
        City: doc.City,
        Country: doc.Country,
        Postal_Code: doc.Postal_Code,
        About_Me: doc.About_Me,
        Token: token,
      };
      return res.status(200).json({ userdetails: user_details });
    }
  );
});

app.get("*", (req, res) => {
  console.log("*", req.body);
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
});
