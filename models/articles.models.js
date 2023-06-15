const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

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
