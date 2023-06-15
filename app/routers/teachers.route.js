const { getTeachers } = require("../../controllers/teachers.controllers");

const teachersRouter = require("express").Router();

teachersRouter.route("/").get(getTeachers);

module.exports = teachersRouter;
