const usersRouter = require("express").Router();
const { getUsers } = require("../../controllers/users.controllers");
const studentsRouter = require("./students.route");
const teachersRouter = require("./teachers.route");

usersRouter.get("/", getUsers);
usersRouter.use("/students", studentsRouter);
usersRouter.use("/teachers", teachersRouter);

module.exports = usersRouter;
