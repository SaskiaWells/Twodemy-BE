const {
  checkFieldExists,
  buildQuery,
  handleSort,
} = require("../app/utils/utils");
const mongoose = require("mongoose");
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

exports.fetchCourseById = async (params) => {
  const courseId = params._id;

  const User = connectionPool.model("User", userSchema);

  const course = await User.aggregate([
    {$unwind: "$teacher"},
    {
      $match: {
        "teacher.courses._id": new mongoose.Types.ObjectId(courseId),
      },
    },
    { $project: {"teacher.courses" : 1} }
  ]);

  if(course[0]) {
    return course[0].teacher.courses[0];
  } else {
    return Promise.reject({ status: 404, msg: "Course not found" })
  }
};

exports.fetchCourseCategories = async () => {


  const User = connectionPool.model("User", userSchema);

  const distinctCourses = await User.distinct('teacher.courses.courseCategory')
  console.log(distinctCourses)
  return distinctCourses

}
