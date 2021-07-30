const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserName: String,
  Password: String,
});

module.exports = mongoose.model("users", UserSchema);
// mongoose.model("categorys", CategorySchema);
