const { fetchArticleComments, updateArticleComments } = require("../models/comments.models");

exports.getArticleComments = async (req, res, next) => {
	const { _id } = req.params;

	try {
		const comments = await fetchArticleComments(_id);
		res.status(200).send({ comments });
	} catch (err) {
		next(err);
	}
};

exports.patchArticleComments = async (req, res, next) => {
	const comment = req.body;
	


	const { _id, comment_id } = req.params;
	try {
		const Newcomment = await updateArticleComments(_id, comment_id, comment);
		res.status(200).send({ Newcomment });
	} catch (err) {
		next(err);
	}
}

