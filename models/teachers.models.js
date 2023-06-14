const { checkFieldExists, buildQuery } = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchTeachers = async (queries) => {
  let query = {
    isTeacher: true,
  };
  query = Object.assign(query, buildQuery(queries));

  const User = connectionPool.model("User", userSchema);
  await checkFieldExists("User", query);
  const teachers = await User.find(query);
  return teachers;
};
