const {
  fetchUsers,
  removeUser,
  authenticateUser,
} = require("../models/users.models");

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

exports.validateUsername = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await authenticateUser(body);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};
