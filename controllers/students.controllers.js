const { fetchStudents } = require("../models/students.models");

exports.getStudents = async (req, res, next) => {
  const queries = req.query;

  try {
    const students = await fetchStudents(queries);
    res.status(200).send({ students });
  } catch (err) {
    next(err);
  }
};
