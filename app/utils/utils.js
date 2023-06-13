const connectionPool = require("../../db/connection");

exports.checkFieldExists = async (modelName, field, value) => {
  const query = { [field]: value };

  const Model = connectionPool.model(modelName);

  try {
    const exists = await Model.exists(query);
    if (!exists) {
      return Promise.reject({ status: 404, msg: "Field does not exist" });
    } else {
      return;
    }
  } catch {}
};
