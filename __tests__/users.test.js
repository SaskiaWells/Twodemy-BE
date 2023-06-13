const request = require("supertest");
const app = require("../app/app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/seedData/testData/users.js");

beforeEach(() => seed(testData));

afterAll(() => connection.close());

describe("GET /api/users", () => {
  test("Status 200 - returns an array of all user objects in the database", () => {
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

describe("GET /api/users/students", () => {
  test("Status 200 - returns an array of all active student objects in the database -- an active student is defined as having a topicsToLearn field", () => {
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
});
