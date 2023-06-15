const usersRouter = require("express").Router();
const { getUsers } = require("../../controllers/users.controllers");
const coursesRouter = require("./courses.route");
const studentsRouter = require("./students.route");
const teachersRouter = require("./teachers.route");

usersRouter.get("/", getUsers);
usersRouter.use("/students", studentsRouter);
usersRouter.use("/teachers", teachersRouter);
usersRouter.use("/courses", coursesRouter);

module.exports = usersRouter;
