const request = require("supertest");
const app = require("../app/app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/seedData/testData/users.js");

beforeEach(() => seed(testData));

afterAll(() => connection.close());

describe("/api/users", () => {
  test("GET Status 200 - returns an array of all user objects in the database", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        expect(response.body.users.length).toBe(10);
        response.body.users.forEach((user) => {
          expect(typeof user._id).toBe("string");
          expect(typeof user.userName).toBe("string");
          expect(typeof user.firstName).toBe("string");
          expect(typeof user.lastName).toBe("string");
          expect(typeof user.email).toBe("string");
          expect(typeof user.password).toBe("string");
          expect(typeof user.profilePicture).toBe("string");
          expect(typeof user.isTeacher).toBe("boolean");
        });
      });
  });
});

describe("/api/users/students", () => {
  test("GET Status 200 - returns an array of all active student objects in the database -- an active student is defined as having a topicsToLearn field", () => {
    return request(app)
      .get("/api/users/students")
      .expect(200)
      .then((response) => {
        expect(response.body.students.length).toBe(8);
        response.body.students.forEach((student) => {
          expect(typeof student._id).toBe("string");
          expect(typeof student.userName).toBe("string");
          expect(typeof student.firstName).toBe("string");
          expect(typeof student.lastName).toBe("string");
          expect(typeof student.email).toBe("string");
          expect(typeof student.password).toBe("string");
          expect(typeof student.profilePicture).toBe("string");
          expect(typeof student.isTeacher).toBe("boolean");
          expect(Array.isArray(student.topicsToLearn)).toBe(true);
          expect(student.topicsToLearn.length).toBeGreaterThan(0);
        });
      });
  });
  test("GET Status 200 - QUERY topicsToLearn: subject - returns an array of students who want to learn that topic", () => {
    return request(app)
      .get("/api/users/students?subject=I%20know%20everything")
      .expect(200)
      .then((response) => {
        expect(response.body.students.length).toBe(1);
        expect(response.body.students[0].topicsToLearn[0].subject).toBe(
          "I know everything"
        );
      });
  });
  test("GET Status 200 - QUERY topicsToLearn: subject&proficiency - returns an array of students who want to learn that topic at that level", () => {
    return request(app)
      .get(
        "/api/users/students?subject=I%20know%20everything&proficiency=Mongod"
      )
      .expect(200)
      .then((response) => {
        expect(response.body.students.length).toBe(1);
        expect(response.body.students[0].topicsToLearn[0].subject).toBe(
          "I know everything"
        );
        expect(response.body.students[0].topicsToLearn[0].proficiency).toBe(
          "Mongod"
        );
      });
  });
  test("GET Status 200 - QUERY topicsToLearn: Maths - returns an array of students who want to learn that topic", () => {
    return request(app)
      .get("/api/users/students?subject=Maths")
      .expect(200)
      .then((response) => {
        expect(response.body.students.length).toBe(2);
        expect(response.body.students[0].topicsToLearn[0].subject).toBe(
          "Maths"
        );
      });
  });
  test("GET Status 200 - QUERY topicsToLearn: Maths&Prodigy - returns an array of students who want to learn that topic at that level", () => {
    return request(app)
      .get("/api/users/students?subject=Maths&proficiency=Prodigy")
      .expect(200)
      .then((response) => {
        expect(response.body.students.length).toBe(1);
        expect(response.body.students[0].topicsToLearn[0].subject).toBe(
          "Maths"
        );
        expect(response.body.students[0].topicsToLearn[0].proficiency).toBe(
          "Prodigy"
        );
      });
  });
  test("GET Status 200 - function works dynamically with many different queries", () => {
    return request(app)
      .get(
        "/api/users/students?subject=Maths&proficiency=Prodigy&firstName=Jonathan"
      )
      .expect(200)
      .then((response) => {
        expect(response.body.students.length).toBe(1);
        expect(response.body.students[0].topicsToLearn[0].subject).toBe(
          "Maths"
        );
        expect(response.body.students[0].topicsToLearn[0].proficiency).toBe(
          "Prodigy"
        );
        expect(response.body.students[0].firstName).toBe("Jonathan");
      });
  });
  test("GET Status 404 - correctly handles error through middleware when querys don't exist", () => {
    return request(app)
      .get(
        "/api/users/students?subject=Maths&proficiency=Prodigy&username=LobotomyNow"
      )
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Field does not exist");
      });
  });
});
