const {
  getStudents,
  postStudent,
} = require("../../controllers/students.controllers");

const studentsRouter = require("express").Router();

studentsRouter.route("/").get(getStudents).post(postStudent);

module.exports = studentsRouter;
