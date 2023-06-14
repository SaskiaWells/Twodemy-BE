const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "test";
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const connectionPool = mongoose.createConnection(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = connectionPool;
