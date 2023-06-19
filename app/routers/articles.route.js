const {
  getArticles,
  getArticleById,
  deleteArticleById,
} = require("../../controllers/articles.controllers");
const {
  getArticleComments,
} = require("../../controllers/comments.controllers");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles);
articleRouter.route("/:_id").get(getArticleById).delete(deleteArticleById);
articleRouter.route("/:_id/comments").get(getArticleComments);

module.exports = articleRouter;
