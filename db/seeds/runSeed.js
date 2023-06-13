const seed = require("./seed");
const testData = require("../seedData/testData/users.js");
const connectionPool = require("../connection");

const runSeed = () => {
	return seed(testData).then(() => {
		connectionPool.close();
	});
};

runSeed();
