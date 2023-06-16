const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");
const {
  checkFieldExists,
  buildQuery,
  handleSort,
} = require("../app/utils/utils");

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
