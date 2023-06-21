const {
  getArticles,
  getArticleById,
  deleteArticleById,
  postArticle,
} = require("../../controllers/articles.controllers");
const {
  getArticleComments,
  patchArticleComments,
} = require("../../controllers/comments.controllers");
const { postComment } = require("../../controllers/comments.controllers");
const { validateComment } = require("../utils/utils");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles);
articleRouter
  .route("/:_id")
  .get(getArticleById)
  .delete(deleteArticleById)
  .post(postArticle);
articleRouter
  .route("/:_id/comments")
  .get(getArticleComments)
  .post(validateComment, postComment);
articleRouter.route("/:_id/comments/:comment_id").patch(patchArticleComments);

module.exports = articleRouter;
