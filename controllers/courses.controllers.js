const { fetchCourses, fetchCourseById } = require("../models/courses.models");

exports.getCourses = async (req, res, next) => {
  const queries = req.query;

  try {
    const courses = await fetchCourses(queries);
    res.status(200).send({ courses });
  } catch (err) {
    next(err);
  }
};

exports.getCoursesById = async (req, res, next) => {
  const params = req.params;

  try {
    const course = await fetchCourseById(params);
    res.status(200).send({ course })
  } catch (err) {
      next(err);
  }
}
