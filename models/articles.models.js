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
	console.log(articleId, "article ID in model");

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

	if (article) {
		console.log(article[0].teacher.articles[0], "article in models");
		return article[0].teacher.articles;
	} else {
		return Promise.reject({ status: 404, msg: "Article not found" });
	}
};

// articles: [
//   {
//     article_title: 'Doc & Phoebe’s Indoor Hunting Feeder review by Anita Kelsey',
//     article_category: 'Quantum Physics',
//     article_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwx5GmYVcbMwo1Fr2dvRX0deJrULElW70Jw&usqp=CAU',
//     article_body: 'Initially I was a little hesitant to review the product because I advocate a cat’s natural diet to be meat, being obligate carnivores and I also come from the school of thought, after continued research into dry biscuits and dental care, that a dry food diet does not clean teeth to prevent the build up of plaque in a way that would prevent dental issues (only a regular professional clean by a vet or home cleaning (good luck with that one!!!) keeps cat’s teeth in tip top condition).',
//     created_by: 'CadenGG',
//     comments: [
//       {
//         comment_body: 'Niccce',
//         created_by: 'Emmy',
//         _id: ObjectId("648c41389d24d5e8698cf6df"),
//         created_at: ISODate("2023-06-16T11:02:16.694Z"),
//         votes: []
//       }
//     ],
//     _id: ObjectId("648ac42475c58ca8fbe8b6ff"),
//     created_at: ISODate("2023-06-16T11:02:16.695Z"),
//     votes: [],
//     article_blurb: 'Initially I was a little hesitant to review the product because I advocate a cat’s natural diet to b'
//   }
// ]
