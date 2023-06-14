const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "test";
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const connectionPool = mongoose.createConnection(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = connectionPool;
