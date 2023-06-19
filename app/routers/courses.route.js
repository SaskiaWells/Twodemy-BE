const { getCourses, getCoursesById } = require("../../controllers/courses.controllers");

const coursesRouter = require("express").Router();

coursesRouter.route("/").get(getCourses);
coursesRouter.route("/:_id").get(getCoursesById);

module.exports = coursesRouter;
