const { fetchCourses } = require("../models/courses.models");

exports.getCourses = async (req, res, next) => {
  const queries = req.query;

  try {
    const courses = await fetchCourses(queries);
    res.status(200).send({ courses });
  } catch (err) {
    next(err);
  }
};
