const userSchema = require("../seedData/schemas/userSchema");
const connectionPool = require("../connection");

const User = connectionPool.model("User", userSchema);

const seed = async (users) => {
	try {
		await User.deleteMany({});
		// await User.insertMany(users);
		for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }
	} catch (err) {
		console.log(err);
	}
};

module.exports = seed;
