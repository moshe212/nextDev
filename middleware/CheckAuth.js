const jwt = require("jsonwebtoken");

const CheckAuth = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.userDetails.token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (e) {
    console.log("middleware", req.body);
    return res.status(401).json({ message: "Auth faild" });
  }
};

module.exports = CheckAuth;
