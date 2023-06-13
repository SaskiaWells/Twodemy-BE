const { getStudents } = require("../../controllers/students.controllers");

const studentsRouter = require("express").Router();

studentsRouter.route("/").get(getStudents);

module.exports = studentsRouter;
