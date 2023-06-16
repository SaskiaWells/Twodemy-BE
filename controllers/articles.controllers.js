const {
	fetchArticles,
	fetchArticleById,
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
