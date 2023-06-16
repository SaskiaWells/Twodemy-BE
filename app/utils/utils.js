const connectionPool = require("../../db/connection");

exports.checkFieldExists = async (modelName, query) => {
  const Model = connectionPool.model(modelName);

  const exists = await Model.exists(query);
  if (!exists) {
    return Promise.reject({ status: 404, msg: "Field does not exist" });
  } else {
    return;
  }
};

exports.buildQuery = (queries) => {
  const query = {};
  const queryLookup = {
    subject: "topicsToLearn.subject",
    proficiency: "topicsToLearn.proficiency",
    qualifications: "teacher.qualifications",
    languages: "languages.language",
    fluency: "languages.fluency",
    username: "userName",
    name: "firstName",
    surname: "lastName",
    premium: "isPremium",
    course: "teacher.courses.courseCategory",
    cost: "teacher.courses.hourlyRate",
    courseRating: "teacher.courses.rating",
    discount: "teacher.courses.discountMultiplier",
    article_category: "teacher.articles.article_category",
    author: "teacher.articles.created_by",
    article_date: "teacher.articles.created_at",
    article_votes: "teacher.articles.total_votes",
    article_title: "teacher.articles.article_title",
  };

  for (const key of Object.keys(queries)) {
    if (queryLookup[key]) {
      const value = queries[key];
      if (!isNaN(value)) {
        query[queryLookup[key]] = Number(value);
      } else if (value.startsWith("<")) {
        query[queryLookup[key]] = { $lt: Number(value.substring(1)) };
      } else if (value.startsWith(">")) {
        query[queryLookup[key]] = { $gt: Number(value.substring(1)) };
      } else {
        query[queryLookup[key]] = value;
      }
    }
  }

  return query;
};

exports.handleSort = (queries) => {
  const { sortBy, order } = queries;

  const sortLookup = {
    rating: "teacher.rating",
    name: "firstName",
    surname: "lastName",
    courseRating: "teacher.courses.rating",
    cost: "teacher.courses.hourlyRate",
    discount: "teacher.courses.discountMultiplier",
    total_votes: "teacher.articles.total_votes",
    date: "teacher.articles.created_at",
  };

  let sortOptions = {};

  if (sortBy && sortLookup[sortBy]) {
    sortOptions[sortLookup[sortBy]] = order === "asc" ? 1 : -1;
  } else {
    sortOptions["_id"] = -1;
  }

  return sortOptions;
};

exports.validateFields = (object) => {
  const whiteList = [
    "userName",
    "firstName",
    "lastName",
    "email",
    "password",
    "profilePicture",
    "languages",
    "calendar",
    "topicsToLearn",
    "aboutMe",
  ];

  const extraKeys = Object.keys(object).filter(
    (key) => !whiteList.includes(key)
  );

  if (extraKeys.length > 0) {
    return Promise.reject({
      status: 404,
      msg: `Invalid fields found: ${extraKeys.join(", ")}`,
    });
  }

  return;
};
