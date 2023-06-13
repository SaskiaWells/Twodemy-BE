const connection = require("../db/connection.js");
const userSchema = require("../db/seedData/schemas/userSchema.js");

exports.fetchUsers = async () => {
	console.log("In model");
	try {
		console.log("In try block");
		const User = connection.model("User", userSchema);
		const users = await User.find();
		console.log(users, "users in model");
		return users;
	} catch {}
};
