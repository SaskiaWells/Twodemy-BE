const {
  getTeachers,
  getTeacherById,
  updateTeacher,
} = require("../../controllers/teachers.controllers");

const teachersRouter = require("express").Router();

teachersRouter.route("/").get(getTeachers);
teachersRouter.route("/:_id").get(getTeacherById).patch(updateTeacher);

module.exports = teachersRouter;
