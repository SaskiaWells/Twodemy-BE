exports.handleInvalidId = (err, req, res, next) => {
  if (err.kind === "ObjectId" || err.toString().slice(0, 9) === "BSONError") {
    res.status(400).send({ msg: "Invalid ID" });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.catchAllError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error!" });
};
