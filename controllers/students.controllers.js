const {
  fetchStudents,
  createUser,
  fetchStudentById,
  patchStudent,
} = require("../models/students.models");

exports.updateStudent = async (req, res, next) => {
  const { body } = req;
  const { _id } = req.params;
  try {
    updatedStudent = await patchStudent(body, _id);
    res.status(200).send({ updatedStudent });
  } catch (err) {
    next(err);
  }
};

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

  try {
    const newStudent = await createUser(body);
    res.status(201).send({ newStudent });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({ msg: "Username already exists" });
    } else {
      next(err);
    }
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
