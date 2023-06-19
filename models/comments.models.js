const { validateFields } = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

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

exports.updateArticleComments = async (_id, comment_id, comment) => {

  if (typeof comment.comment_body !== 'string') {
    return Promise.reject({ status: 400, msg: "Invalid field type" })
  }
    
  const User = connectionPool.model("User", userSchema);

  await validateFields(comment);

  const updatedUser = await User.findOneAndUpdate(
    { "teacher.articles.comments._id": comment_id },
    { $set: { "teacher.articles.$[].comments.$[comment].comment_body": comment.comment_body } },
    {
      new: true,
      arrayFilters: [{ "comment._id": comment_id }],
    },
    { $project: { "teacher.articles.comments": 1, _id: 0 } }
  );

  if (!updatedUser) {
    return Promise.reject({ status: 404, msg: "Comment does not exist" });
  }
  
  const updatedComment = updatedUser.teacher.articles
    .flatMap((article) => article.comments)
    .filter((comment) => comment._id.equals(new ObjectId(comment_id)))[0];
    

  return updatedComment
}

exports.sendComment = async (comment, _id) => {
  const User = connectionPool.model("User", userSchema);

  if (typeof comment.comment_body !== 'string') {
    return Promise.reject({ status: 400, msg: "Invalid field type" })
  }

const newUser = await User.findOneAndUpdate(
    { "teacher.articles._id": new mongoose.Types.ObjectId(_id) },
    { $push: { "teacher.articles.$[].comments": comment } },
   { new: true })
  
  if (!newUser) {
    return Promise.reject({ status: 404, msg: "Article does not exist" });
  }
  
  const result = await User.aggregate([
    { $unwind: "$teacher.articles" },
    {
      $match: {
        "teacher.articles._id": new mongoose.Types.ObjectId(_id),
      },
    },
    {
      $project: {
        lastComment: { $arrayElemAt: ["$teacher.articles.comments", -1] },
      },
    },
  ]);

  
  
  return result[0].lastComment;



}