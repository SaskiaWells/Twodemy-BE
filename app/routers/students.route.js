const {
	getStudents,

	getStudentById,
} = require("../../controllers/students.controllers");


const studentsRouter = require("express").Router();

studentsRouter.route("/").get(getStudents)
studentsRouter.route("/:_id").get(getStudentById);

module.exports = studentsRouter;
