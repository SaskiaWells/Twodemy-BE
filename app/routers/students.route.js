const {
  getStudents,
  postStudent,
  getStudentById,
  updateStudent,
} = require("../../controllers/students.controllers");
const { validateStudent } = require("../utils/validateStudents");

const studentsRouter = require("express").Router();

studentsRouter.route("/").get(getStudents).post(validateStudent, postStudent);
studentsRouter.route("/:_id").get(getStudentById).patch(updateStudent);

module.exports = studentsRouter;
