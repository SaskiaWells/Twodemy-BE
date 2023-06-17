const { isValidObjectId } = require("mongoose");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchUsers = async () => {
  try {
    const User = connectionPool.model("User", userSchema);
    const users = await User.find();
    return users;
  } catch {}
};

exports.removeUser = async (id) => {
  if (!isValidObjectId(id)) {
    return Promise.reject({ status: 400, msg: "Invalid user ID" });
  }

  const User = connectionPool.model("User", userSchema);
  const userExists = await User.exists({ _id: id });
  if (!userExists) {
    return Promise.reject({ status: 404, msg: "User not found" });
  }
  try {
    await User.deleteOne({ _id: id });
  } catch (error) {
    return Promise.reject({ status: 500, msg: "Failed to delete user" });
  }
};
