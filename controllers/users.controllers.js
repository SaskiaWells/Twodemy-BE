const { fetchUsers, removeUser } = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    await removeUser(_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
