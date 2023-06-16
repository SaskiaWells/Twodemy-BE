const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");
const mongoose = require("mongoose");

exports.fetchArticles = async (queries) => {
	const User = connectionPool.model("User", userSchema);

	const articles = await User.aggregate([
		{ $match: { "teacher.articles.article_title": { $exists: true } } },
		{ $project: { "teacher.articles": 1 } },
	]);

	const formattedArticles = articles
		.map((article) => {
			return article.teacher.articles;
		})
		.flat();

	return formattedArticles;
};

exports.fetchArticleById = async (params) => {
	const articleId = params._id;

	const User = connectionPool.model("User", userSchema);

	const article = await User.aggregate([
		{ $unwind: "$teacher" },
		{
			$match: {
				"teacher.articles._id": new mongoose.Types.ObjectId(articleId),
			},
		},
		{ $project: { "teacher.articles": 1 } },
	]);

	if (article[0]) {
		return article[0].teacher.articles[0];
	} else {
		return Promise.reject({ status: 404, msg: "Article not found" });
	}
};
