const {
  fetchArticles,
  fetchArticleById,
  removeArticleById,
  createArticle,
} = require("../models/articles.models");

exports.getArticles = async (req, res, next) => {
  const queries = req.query;

  try {
    const articles = await fetchArticles(queries);
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  const params = req.params;

  try {
    const article = await fetchArticleById(params);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.deleteArticleById = async (req, res, next) => {
  const { _id } = req.params;
  try {
    await removeArticleById(_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.postArticle = async (req, res, next) => {
  const { _id } = req.params;
  const { body } = req;
  try {
    const newArticle = await createArticle(_id, body);
    res.status(201).send({ newArticle });
  } catch (err) {
    next(err);
  }
};
