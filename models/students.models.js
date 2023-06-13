const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchStudents = async () => {
  try {
    const User = connectionPool.model("User", userSchema);
    const students = await User.find({
      topicsToLearn: { $exists: true, $ne: [] },
    });
    console.log(students, "students in model");
    return students;
  } catch {}
};
