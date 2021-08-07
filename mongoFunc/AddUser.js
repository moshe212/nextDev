const { models } = require("../models");

const AddUser = async function ({
  UserName,
  Password,
  Company,
  Email_address,
  First_Name,
  Last_Name,
  City,
  Country,
  Postal_Code,
  About_Me,
}) {
  const user = new models.User({
    UserName,
    Password,
    Company,
    Email_address,
    First_Name,
    Last_Name,
    City,
    Country,
    Postal_Code,
    About_Me,
  });

  let newUser;
  try {
    newUser = await user.save();

    return newUser;
  } catch (error) {
    console.log(`AddUser - error - ${error}`);
    return error;
  }
};

module.exports = { AddUser };
