const { fetchArticles } = require("../models/articles.models");

exports.getArticles = async (req, res, next) => {
  const queries = req.query;

  try {
    const articles = await fetchArticles(queries);
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};
