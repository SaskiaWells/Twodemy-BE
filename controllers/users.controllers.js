const { fetchUsers } = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
	try {
		const users = await fetchUsers();
		console.log(users, "users in getUsers");
		res.status(200).send({ users: users });
	} catch (err) {
		next;
	}
};
