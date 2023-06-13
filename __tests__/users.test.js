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
				// console.log(response, "res in test");
				expect(response.body.length).toBe(10);
				response.body.users.forEach((user) => {
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
