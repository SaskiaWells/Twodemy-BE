const {
  checkFieldExists,
  buildQuery,
  handleSort,
} = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchCourses = async (queries) => {
  const sortBy = handleSort(queries);
  let query = {
    "teacher.courses.courseName": { $exists: true },
  };

  query = Object.assign(query, buildQuery(queries));
  console.log(queries);
  console.log(query, "query!");
  const User = connectionPool.model("User", userSchema);
  await checkFieldExists("User", query);
  const courseObjects = await User.aggregate([
    { $match: query },
    { $project: { "teacher.courses": 1 } },
    { $sort: sortBy },
  ]);
  console.log(courseObjects);
  const courses = courseObjects
    .map((teacher) => teacher.teacher.courses)
    .flat();
  console.log(courses);
  return courses;
};
