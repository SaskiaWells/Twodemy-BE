const { fetchTeachers } = require("../models/teachers.models");

exports.getTeachers = async (req, res, next) => {
  const queries = req.query;

  try {
    const teachers = await fetchTeachers(queries);
    res.status(200).send({ teachers });
  } catch (err) {
    next(err);
  }
};
