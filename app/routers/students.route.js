const {
  getStudents,
  postStudent,
  getStudentById,
  updateStudent,
} = require("../../controllers/students.controllers");


const studentsRouter = require("express").Router();

studentsRouter.route("/").get(getStudents)
studentsRouter.route("/:_id").get(getStudentById).patch(updateStudent);

module.exports = studentsRouter;
