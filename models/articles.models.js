const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
const {
  checkFieldExists,
  buildQuery,
  handleSort,
} = require("../app/utils/utils");
const articleRouter = require("../app/routers/articles.route");

exports.fetchArticles = async (queries) => {
  const User = connectionPool.model("User", userSchema);

  const sortBy = handleSort(queries);
  let query = {
    "teacher.articles.article_title": { $exists: true },
  };

  query = Object.assign(query, buildQuery(queries));

  if (query.hasOwnProperty("teacher.articles.created_at")) {
    year = query["teacher.articles.created_at"];

    delete query["teacher.articles.created_at"];

    await checkFieldExists("User", query);
    const specificYearArticles = await User.aggregate([
      { $match: query },
      { $unwind: "$teacher.articles" },
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$teacher.articles.created_at" }, year],
          },
        },
      },
      { $project: { "teacher.articles": 1 } },
      { $sort: sortBy },
    ]);

    const newformattedArticles = specificYearArticles
      .map((article) => {
        return article.teacher.articles;
      })
      .flat();

    return newformattedArticles;
  }

  await checkFieldExists("User", query);

  //use aggregate to return ones with the date of a specific query if that query exists
  const articles = await User.aggregate([
    { $match: query },
    { $project: { "teacher.articles": 1 } },
    { $sort: sortBy },
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

  const article = await User.findOne({
    "teacher.articles._id": articleId,
  }).select("teacher.articles.$");

  if (article && article.teacher.articles.length > 0) {
    return article.teacher.articles[0];
  } else {
    throw { status: 404, msg: "Article not found" };
  }
};

exports.removeArticleById = async (id) => {
  if (!isValidObjectId(id)) {
    return Promise.reject({ status: 400, msg: "Invalid article ID" });
  }
  const User = connectionPool.model("User", userSchema);

  const article = await User.aggregate([
    { $unwind: "$teacher" },
    {
      $match: {
        "teacher.articles._id": new mongoose.Types.ObjectId(id),
      },
    },
    { $project: { "teacher.articles": 1 } },
  ]);

  if (!article || article.length === 0) {
    return Promise.reject({ status: 404, msg: "Article not found" });
  }
  try {
    await User.findOneAndUpdate(
      { "teacher.articles._id": id },
      { $pull: { "teacher.articles": { _id: id } } }
    );
  } catch (err) {
    return Promise.reject({ status: 500, msg: "Failed to delete article" });
  }
};
