const fs = require("fs/promises");

exports.getEndpoints = async (req, res, next) => {
	try {
		fs.readFile(`${__dirname}/../endpoints.json`).then((endpoints) => {
			const parsedEndpoints = JSON.parse(endpoints);
			res.status(200).send({ endpoints: parsedEndpoints });
		});
	} catch (err) {
		next(err);
	}
};
