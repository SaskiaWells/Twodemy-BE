const {
  checkFieldExists,
  buildQuery,
  validateFields,
} = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

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

exports.fetchStudentById = async (params) => {
  // NOTE: Functionally, this currently works as fetchUserById. If we want this to be for 'active' students, then we will need to modify this function, and create an endpoint for GET userById too.

  const User = connectionPool.model("User", userSchema);
  const student = await User.findById(params._id);
  if (student) {
    return student;
  } else {
    return Promise.reject({ status: 404, msg: "User not found" });
  }
};

exports.patchStudent = async (newFields, id) => {
  await validateFields(newFields);
  const User = connectionPool.model("User", userSchema);
  const updatedStudent = await User.findByIdAndUpdate(id, newFields, {
    new: true,
  });
  return updatedStudent;
};
