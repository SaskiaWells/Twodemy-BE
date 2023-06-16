const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");
const mongoose = require("mongoose");

exports.fetchArticleComments = async (_id) => {
  const User = connectionPool.model("User", userSchema);

  const comments = await User.aggregate([
      { $match: { "teacher.articles._id": new mongoose.Types.ObjectId(_id) } },
    {$unwind: "$teacher.articles"},
    { $project: { "teacher.articles.comments": 1, _id: 0 } },
  ]);
    
    if (comments.length === 0) {
      return Promise.reject({ status: 404, msg: "No comments available" });
    }

  const formattedComments = comments[0].teacher.articles.comments;

   return formattedComments;
 
};
