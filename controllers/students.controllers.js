const { fetchStudents, createStudent } = require("../models/students.models");

exports.getStudents = async (req, res, next) => {
  const queries = req.query;

  try {
    const students = await fetchStudents(queries);
    res.status(200).send({ students });
  } catch (err) {
    next(err);
  }
};

exports.postStudent = async (req, res, next) => {
  const body = req.body;
  try {
    newStudent = await createStudent(body);
    res.status(201).send({ newStudent });
  } catch (err) {
    next(err);
  }
};
