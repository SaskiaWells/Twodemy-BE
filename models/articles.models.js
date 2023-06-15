const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");
const {
  checkFieldExists,
  buildQuery,
  handleSort,
} = require("../app/utils/utils");

exports.fetchArticles = async (queries) => {
    const User = connectionPool.model("User", userSchema);


    console.log('in the model')
    const articles = await User.aggregate([
        { $match: { "teacher.articles.article_title": { $exists: true } } },
        { $project: {'teacher.articles': 1}}
    ])
    const sortBy = handleSort(queries);
    let query = {
      "teacher.articles.artcile_title": { $exists: true },
    };
    query = Object.assign(query, buildQuery(queries));
    
    const formattedArticles = articles.map((article) => { return article.teacher.articles }).flat();
  
    return formattedArticles;
};
