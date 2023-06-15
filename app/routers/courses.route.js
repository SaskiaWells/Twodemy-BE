const { getCourses } = require("../../controllers/courses.controllers");

const coursesRouter = require("express").Router();

coursesRouter.route("/").get(getCourses);

module.exports = coursesRouter;
