const {
  fetchStudents,
  createUser,
  fetchStudentById,
} = require("../models/students.models");

exports.getStudents = async (req, res, next) => {
  const queries = req.query;

  try {
    const students = await fetchStudents(queries);
    res.status(200).send({ students });
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  const body = req.body;
  consoe.log('controller');
  try {
    newStudent = await createUser(body);
    res.status(201).send({ newUser });
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  const params = req.params;

  try {
    const student = await fetchStudentById(params);
    res.status(200).send({ student });
  } catch (err) {
    next(err);
  }
};
