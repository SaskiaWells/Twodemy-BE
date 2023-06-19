const { fetchCourses, fetchCourseCategories } = require("../models/courses.models");

exports.getCourses = async (req, res, next) => {
  const queries = req.query;

  try {
    const courses = await fetchCourses(queries);
    res.status(200).send({ courses });
  } catch (err) {
    next(err);
  }
};

exports.getCourseCategories = async (req, res, next) => {
console.log("hello controller")
  try {
    const categories = await fetchCourseCategories();
    res.status(200).send({ categories });
  } catch (err) {
    next(err);
  }
}
