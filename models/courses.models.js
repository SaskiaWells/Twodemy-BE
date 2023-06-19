const {
  checkFieldExists,
  buildQuery,
  handleSort,
} = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchCourses = async (queries) => {
  if (queries.courseList) {
    const User = connectionPool.model("User", userSchema);
    const distinctCourses = await User.distinct(
      "teacher.courses.courseCategory"
    );
    return distinctCourses;
  }

  const sortBy = handleSort(queries);
  let query = {
    "teacher.courses.courseName": { $exists: true },
  };
  query = Object.assign(query, buildQuery(queries));

  const User = connectionPool.model("User", userSchema);
  await checkFieldExists("User", query);
  const courseObjects = await User.aggregate([
    { $match: query },
    { $project: { "teacher.courses": 1 } },
    { $sort: sortBy },
  ]);

  const courses = courseObjects
    .map((teacher) => teacher.teacher.courses)
    .flat();

  return courses;
};

exports.fetchCourseCategories = async () => {


  const User = connectionPool.model("User", userSchema);

  const distinctCourses = await User.distinct('teacher.courses.courseCategory')
  return distinctCourses

}