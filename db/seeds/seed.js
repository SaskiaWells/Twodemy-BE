const userSchema = require("../seedData/schemas/userSchema");
const connectionPool = require("../connection");
const testData = require("../seedData/testData/users");

const User = connectionPool.model("User", userSchema);

const seed = async (users) => {
	try {
		await User.deleteMany({});
		await User.insertMany(users);
		// connectionPool.close();
	} catch (err) {
		console.log(err);
	}
};

const runSeed = () => {
	return seed(testData).then(() => {
		// connectionPool.close();
	});
};

// runSeed();

module.exports = seed;
