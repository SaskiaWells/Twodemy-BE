const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users.route");
const { handleCustomError, catchAllError } = require("./utils/errorHandling");

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);

app.use(handleCustomError);
app.use(catchAllError);

module.exports = app;
