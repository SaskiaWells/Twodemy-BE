const { checkFieldExists } = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchStudents = async (queries) => {
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

  for (const key of Object.keys(queries)) {
    if (key !== "subject" && key !== "proficiency") {
      await checkFieldExists("User", { [key]: queries[key] });
      query[key] = queries[key];
    }
  }

  try {
    const User = connectionPool.model("User", userSchema);
    await checkFieldExists("User", query);
    const students = await User.find(query);
    return students;
  } catch {}
};
