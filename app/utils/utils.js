const connectionPool = require("../../db/connection");

exports.checkFieldExists = async (modelName, query) => {
  const Model = connectionPool.model(modelName);

  const exists = await Model.exists(query);
  if (!exists) {
    return Promise.reject({ status: 404, msg: "Field does not exist" });
  } else {
    return;
  }
};
