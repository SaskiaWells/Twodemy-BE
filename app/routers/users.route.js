const usersRouter = require("express").Router();
const { getUsers, deleteUser } = require("../../controllers/users.controllers");
const coursesRouter = require("./courses.route");
const articleRouter = require("./articles.route");
const studentsRouter = require("./students.route");
const teachersRouter = require("./teachers.route");

usersRouter.get("/", getUsers);
usersRouter.delete("/:_id", deleteUser);
usersRouter.use("/students", studentsRouter);
usersRouter.use("/teachers", teachersRouter);
usersRouter.use("/courses", coursesRouter);
usersRouter.use("/articles", articleRouter);

module.exports = usersRouter;
