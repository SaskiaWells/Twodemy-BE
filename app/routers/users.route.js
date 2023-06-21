const usersRouter = require("express").Router();
const {
  getUsers,
  deleteUser,
  validateUsername,
} = require("../../controllers/users.controllers");
const coursesRouter = require("./courses.route");
const articleRouter = require("./articles.route");
const studentsRouter = require("./students.route");
const teachersRouter = require("./teachers.route");
const { validateUser } = require("../utils/validateStudents");
const { postUser } = require("../../controllers/students.controllers");

usersRouter.route("/").get(getUsers).post(validateUser, postUser);
usersRouter.delete("/:_id", deleteUser);
usersRouter.use("/students", studentsRouter);
usersRouter.use("/teachers", teachersRouter);
usersRouter.use("/courses", coursesRouter);
usersRouter.use("/articles", articleRouter);
usersRouter.post("/authentication", validateUsername);

module.exports = usersRouter;
