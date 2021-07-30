const { models } = require("../models");

const AddUser = async function ({ UserName, Password }) {
  const user = new models.TaskDetails({
    UserName,
    Password,
  });

  let newUser;
  try {
    newUser = await user.save();

    return newUser;
  } catch (error) {
    console.log(`AddUser - error - ${error}`);
    throw error;
  }
};

module.exports = { AddUser };
