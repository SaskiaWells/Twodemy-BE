const { getEndpoints } = require("../../controllers/api.controllers");
const usersRouter = require("./users.route");

const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.get("/", getEndpoints);

module.exports = apiRouter;
