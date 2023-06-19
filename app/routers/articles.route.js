const {
  getArticles,
  getArticleById,
} = require("../../controllers/articles.controllers");
const {
  getArticleComments,
  patchArticleComments,
} = require("../../controllers/comments.controllers");
const { postComment } = require("../../controllers/comments.controllers");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles);
articleRouter.route("/:_id").get(getArticleById);
articleRouter.route("/:_id/comments").get(getArticleComments).post(postComment);
articleRouter.route("/:_id/comments/:comment_id").patch(patchArticleComments);

module.exports = articleRouter;
