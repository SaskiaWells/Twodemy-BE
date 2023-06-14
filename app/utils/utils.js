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
  };

  const query = {};

  for (const key of Object.keys(queries)) {
    if (queryLookup[key]) {
      query[queryLookup[key]] = queries[key];
    }
  }

  return query;
};
