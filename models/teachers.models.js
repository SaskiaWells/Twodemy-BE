const {
	checkFieldExists,
	buildQuery,
	handleSort,
	validateFields,
	buildPatchTeacherQuery,
} = require("../app/utils/utils");
const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchTeachers = async (queries) => {
	let query = {
		isTeacher: true,
	};

	query = Object.assign(query, buildQuery(queries));

	const sortBy = handleSort(queries);

	const User = connectionPool.model("User", userSchema);
	await checkFieldExists("User", query);
	const teachers = await User.find(query).sort(sortBy);
	return teachers;
};

exports.fetchTeacherById = async (params) => {
	let query = {
		isTeacher: true,
	};

	const User = connectionPool.model("User", userSchema);
	await checkFieldExists("User", query);
	const teacher = await User.findById(params._id);
	if (teacher) {
		return teacher;
	} else {
		return Promise.reject({ status: 404, msg: "User not found" });
	}
};

exports.patchTeacher = async (fields, id) => {
	await validateFields(fields);
	const newFields = buildPatchTeacherQuery(fields);
	const User = connectionPool.model("User", userSchema);
	const updatedTeacher = await User.findByIdAndUpdate(id, newFields, {
		new: true,
	});
	return updatedTeacher;
};
