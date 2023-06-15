const {
	getTeachers,
	getTeacherById,
} = require("../../controllers/teachers.controllers");

const teachersRouter = require("express").Router();

teachersRouter.route("/").get(getTeachers);
teachersRouter.route("/:_id").get(getTeacherById);

module.exports = teachersRouter;
