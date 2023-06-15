const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users.route");
const {
  handleInvalidId,
  handleCustomError,
  catchAllError,
} = require("./utils/errorHandling");
const apiRouter = require("./routers/apiRouter");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleInvalidId);
app.use(handleCustomError);
app.use(catchAllError);

module.exports = app;
