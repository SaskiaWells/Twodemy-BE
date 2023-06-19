exports.validateUser = (req, res, next) => {
  const requiredFields = [
    "userName",
    "firstName",
    "lastName",
    "email",
    "password",
    "profilePicture",
    "languages",
  ];
  let missingFields = [];

  for (let i = 0; i < requiredFields.length; i++) {
    if (!req.body.hasOwnProperty(requiredFields[i])) {
      missingFields.push(requiredFields[i]);
    }
  }

  if (missingFields.length > 0) {
    let err = new Error();
    err.msg = `Missing required field(s): ${missingFields.join(", ")}`;
    err.status = 404;
    return next(err);
  }

  next();
};
