const request = require("supertest");
const app = require("../app/app.js");
const connection = require("../db/connection.js");

afterAll(() => connection.close());

describe("/api", () => {
  test("GET - status 200 - Responds with an object containing information on all server endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
        const endpoints = res.body.endpoints;
        const endpointKeys = Object.keys(endpoints);
        expect(endpointKeys.length).toBe(20);
        expect(endpoints.hasOwnProperty("GET /api")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/users")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/users/students")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/users/teachers")).toBe(true);
        expect(endpoints.hasOwnProperty("POST /api/users/students")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/users/articles")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/users/teachers/:_id")).toBe(
          true
        );
        expect(endpoints.hasOwnProperty("GET /api/users/students/:_id")).toBe(
          true
        );
        expect(endpoints.hasOwnProperty("GET /api/users/courses")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/users/articles/:_id")).toBe(
          true
        );
        expect(
          endpoints.hasOwnProperty("GET /api/users/articles/:_id/comments")
        ).toBe(true);
        expect(endpoints.hasOwnProperty("PATCH /api/users/students/:id")).toBe(
          true
        );
        expect(endpoints.hasOwnProperty("PATCH /api/users/teachers/:id")).toBe(
          true
        );
        expect(endpoints.hasOwnProperty("DELETE /api/users/:id")).toBe(true);
        expect(endpoints.hasOwnProperty("DELETE /api/users/article/:_id")).toBe(
          true
        );
        expect(
          endpoints.hasOwnProperty("GET /api/users/courses/:course_id")
        ).toBe(true);
      });
  });
});
