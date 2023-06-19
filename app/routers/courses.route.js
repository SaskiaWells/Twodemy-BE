const { getCourses, getCoursesById, getCourseCategories } = require("../../controllers/courses.controllers");

const coursesRouter = require("express").Router();

coursesRouter.route("/").get(getCourses);
coursesRouter.route("/categories").get(getCourseCategories);
coursesRouter.route("/:_id").get(getCoursesById);

module.exports = coursesRouter;
