const { fetchArticleComments } = require("../models/comments.models");

exports.getArticleComments = async (req, res, next) => {
	const { _id } = req.params;

	try {
		const comments = await fetchArticleComments(_id);
		res.status(200).send({ comments });
	} catch (err) {
		next(err);
	}
};
