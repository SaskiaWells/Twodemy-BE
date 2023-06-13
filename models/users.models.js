const connectionPool = require("../db/connection");
const userSchema = require("../db/seedData/schemas/userSchema");

exports.fetchUsers = async () => {
	try {
		const User = connectionPool.model("User", userSchema);
		const users = await User.find();
		return users;
	} catch {}
};
