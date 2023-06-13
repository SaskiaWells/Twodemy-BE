const { checkFieldExists } = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchStudents = async (queries) => {
  // checkFieldExists('User', topicsToLearn)

  const query = {
    topicsToLearn: { $exists: true, $ne: [] },
  };

  const subjectQuery = queries.subject;
  const proficiencyQuery = queries.proficiency;

  if (subjectQuery && typeof subjectQuery === "string") {
    query["topicsToLearn.subject"] = subjectQuery;
  }
  if (proficiencyQuery && typeof proficiencyQuery === "string") {
    query["topicsToLearn.proficiency"] = proficiencyQuery;
  }

  try {
    const User = connectionPool.model("User", userSchema);
    const students = await User.find(query);
    return students;
  } catch {}
};
