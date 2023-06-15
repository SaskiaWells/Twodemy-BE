const { checkFieldExists, buildQuery } = require("../../app/utils/utils");
const connectionPool = require("../../db/connection");
const userSchema = require("../../db/seedData/schemas/userSchema");

exports.fetchStudents = async (queries) => {
  let query = {
    topicsToLearn: { $exists: true, $ne: [] },
  };

  query = Object.assign(query, buildQuery(queries));

  const User = connectionPool.model("User", userSchema);
  await checkFieldExists("User", query);
  const students = await User.find(query);
  return students;
};

exports.createStudent = async (student) => {
  const User = connectionPool.model("User", userSchema);
  const newStudent = new User(student);
  await newStudent.save();
  return newStudent;
};
