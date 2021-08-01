const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UserName: String,
  Password: String,
  Company: String,
  Email_address: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
  },
  First_Name: String,
  Last_Name: String,
  City: String,
  Country: String,
  Postal_Code: String,
});

module.exports = mongoose.model("users", UserSchema);
// mongoose.model("categorys", CategorySchema);
