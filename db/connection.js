const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/../.env.test` });

const connectionPool = mongoose.createConnection(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connectionPool;
