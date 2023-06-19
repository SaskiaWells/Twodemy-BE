const usersRouter = require("express").Router();
const { getUsers } = require("../../controllers/users.controllers");
const coursesRouter = require("./courses.route");
const articleRouter = require("./articles.route");
const studentsRouter = require("./students.route");
const teachersRouter = require("./teachers.route");
const { validateUser } = require("../utils/validateStudents");
const { postUser } = require("../../controllers/students.controllers");

usersRouter.get("/", getUsers).post(validateUser, postUser);
usersRouter.use("/students", studentsRouter);
usersRouter.use("/teachers", teachersRouter);
usersRouter.use("/courses", coursesRouter);
usersRouter.use("/articles", articleRouter);

module.exports = usersRouter;
