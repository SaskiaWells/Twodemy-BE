const {
  fetchTeachers,
  fetchTeacherById,
  patchTeacher,
} = require("../models/teachers.models");

exports.updateTeacher = async (req, res, next) => {
  const { body } = req;
  const { _id } = req.params;
  try {
    updatedTeacher = await patchTeacher(body, _id);
    res.status(200).send({ updatedTeacher });
  } catch (err) {
    next(err);
  }
};

exports.getTeachers = async (req, res, next) => {
  const queries = req.query;

  try {
    const teachers = await fetchTeachers(queries);
    res.status(200).send({ teachers });
  } catch (err) {
    next(err);
  }
};

exports.getTeacherById = async (req, res, next) => {
  const params = req.params;

  try {
    const teacher = await fetchTeacherById(params);
    res.status(200).send({ teacher });
  } catch (err) {
    next(err);
  }
};
