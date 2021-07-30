const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserName: String,
  Password: String,
  Company: String,
  Email_address: String,
  First_Name: String,
  Last_Name: String,
  City: String,
  Country: String,
  Postal_Code: String,
});

module.exports = mongoose.model("users", UserSchema);
// mongoose.model("categorys", CategorySchema);
