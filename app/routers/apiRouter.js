const usersRouter = require("./users.route");

const apiRouter = require("express").Router();

apiRouter.use("/users", usersRouter);
apiRouter.get("/");

module.exports = apiRouter;
