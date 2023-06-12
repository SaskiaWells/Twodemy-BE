const express = require("express");
const cors = require("cors");
const apiRouter = require("./routers/api.route");

const app = express();
app.use(express.json());

app.use("/api/users", apiRouter);

module.exports = app;
