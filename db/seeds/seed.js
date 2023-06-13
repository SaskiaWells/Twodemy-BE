const userSchema = require("../seedData/schemas/userSchema");
const connectionPool = require("../connection");

const User = connectionPool.model("User", userSchema);

const seed = async (users) => {
	try {
		await User.deleteMany({});
		await User.insertMany(users);
	} catch (err) {
		console.log(err);
	}
};

module.exports = seed;
