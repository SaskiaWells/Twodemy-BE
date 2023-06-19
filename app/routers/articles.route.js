const {
  getArticles,
  getArticleById,
  deleteArticleById,
} = require("../../controllers/articles.controllers");
const {
  getArticleComments,
  patchArticleComments,
} = require("../../controllers/comments.controllers");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles);
articleRouter.route("/:_id").get(getArticleById).delete(deleteArticleById);
articleRouter.route("/:_id/comments").get(getArticleComments);
articleRouter.route("/:_id/comments/:comment_id").patch(patchArticleComments);

module.exports = articleRouter;
