const {
  getStudents,
  postStudent,
} = require("../../controllers/students.controllers");
const { validateStudent } = require("../utils/validateStudents");

const studentsRouter = require("express").Router();

studentsRouter.route("/").get(getStudents).post(validateStudent, postStudent);

module.exports = studentsRouter;
