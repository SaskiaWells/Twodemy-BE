const {
	getStudents,
	postStudent,
	getStudentById,
} = require("../../controllers/students.controllers");
const { validateStudent } = require("../utils/validateStudents");

const studentsRouter = require("express").Router();

studentsRouter.route("/").get(getStudents).post(validateStudent, postStudent);
studentsRouter.route("/:_id").get(getStudentById);

module.exports = studentsRouter;
