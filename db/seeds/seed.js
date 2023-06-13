const userSchema = require("../seedData/schemas/userSchema");
const connectionPool = require("../connection");
const testData = require("../seedData/testData/users");

const User = connectionPool.model("User", userSchema);

const seed = async (users) => {
	console.log("in seed");
	try {
		console.log("in try block");
		await User.deleteMany({});
		await User.insertMany(users);
		console.log("data inserted!!");
		connectionPool.close();
	} catch (err) {
		console.log(err);
	}
};

const runSeed = () => {
	return seed(testData).then(() => {
		connectionPool.close();
		console.log("in the then!");
	});
};

runSeed();

module.exports = seed;
