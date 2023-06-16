const {
	getArticles,
	getArticleById,
} = require("../../controllers/articles.controllers");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles);
articleRouter.route("/:_id").get(getArticleById);

module.exports = articleRouter;
