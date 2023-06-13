const { fetchStudents } = require("../models/students.models");

exports.getStudents = async (req, res, next) => {
  try {
    const students = await fetchStudents();
    res.status(200).send({ students });
  } catch (err) {
    next(err);
  }
};
