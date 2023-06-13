const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users.route");

const app = express();
app.use(express.json());

app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {});

module.exports = app;
