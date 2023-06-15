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
      "teacher.articles.artcile_title": { $exists: true },
    };
    console.log(query)
    query = Object.assign(query, buildQuery(queries));

  await checkFieldExists("User", query);
    const articles = await User.aggregate([
      { $match: query },
      { $project: { "teacher.articles": 1 } },
      { $sort: sortBy },
    ]);
    const formattedArticles = articles.map((article) => { return article.teacher.articles }).flat();
  
    return formattedArticles;
};
