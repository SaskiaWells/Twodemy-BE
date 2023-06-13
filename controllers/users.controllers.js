const { fetchUsers } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
	console.log("In controller");
	fetchUsers()
		.then((users) => {
			res.status(200).send({ users });
		})
		.catch(next);
};
