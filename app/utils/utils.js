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
  };

  let sortOptions = {};

  if (sortBy && sortLookup[sortBy]) {
    sortOptions[sortLookup[sortBy]] = order === "asc" ? 1 : -1;
  } else {
    sortOptions["_id"] = -1;
  }

  return sortOptions;
};
