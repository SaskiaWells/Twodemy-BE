const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "test";
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env.${ENV}` });
const source = process.env.MONGODB_URL;

const connectionPool = mongoose.createConnection(source, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = connectionPool;
