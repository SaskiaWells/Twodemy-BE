const usersRouter = require("express").Router();
const studentsRouter = require("./students.route");
const teachersRouter = require("./teachers.route");

usersRouter.get("/");
usersRouter.use("/students", studentsRouter);
usersRouter.use("/teachers", teachersRouter);

module.exports = usersRouter;
