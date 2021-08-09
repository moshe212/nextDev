const jwt = require("jsonwebtoken");
const { models } = require("../models");

const CheckAuth = (req, res, next) => {
  console.log("token", req.body.userDetails.token);
  try {
    models.User.find({ Token: req.body.userDetails.token })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({ message: "Auth faild" });
        }
        const decoded = jwt.verify(
          req.body.userDetails.token,
          process.env.JWT_KEY
        );
        req.userData = decoded;
        next();
      });
    // const decoded = jwt.verify(req.body.userDetails.token, process.env.JWT_KEY);
    // req.userData = decoded;
    // next();
  } catch (e) {
    console.log("middleware", req.body);
    return res.status(401).json({ message: "Auth faild" });
  }
};

module.exports = CheckAuth;
