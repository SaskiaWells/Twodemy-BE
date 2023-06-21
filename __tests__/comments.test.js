const request = require("supertest");
const app = require("../app/app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/seedData/testData/users.js");

beforeEach(() => seed(testData));

afterAll(() => connection.close());

describe("/api/articles/:_id/comments", () => {
	test("GET Status 200 - returns an array of all comments for specific article", () => {
		return request(app)
			.get("/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments")
			.expect(200)
			.then((response) => {
				response.body.comments.forEach((comment) => {
					expect(typeof comment._id).toBe("string");
					expect(typeof comment.comment_body).toBe("string");
					expect(typeof comment.created_by).toBe("string");
					expect(typeof comment.created_at).toBe("string");
					expect(Array.isArray(comment.votes)).toBe(true);
					expect(typeof comment.total_votes).toBe("number");
				});
			});
	});
	test("GET Status 404 - returna an error when you look for comments for an article that does not ahve any comments", () => {
		return request(app)
			.get("/api/users/articles/648c66086f2a6b6cd84be886/comments")
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("No comments available");
			});
	});
	test("POST Status 201 - adds a new comment to the article", () => {
		return request(app)
			.post("/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments")
			.send({ comment_body: "Nice article", created_by: "Emmy" })
			.expect(201)
			.then((response) => {
				expect(response.body.Newcomment.comment_body).toBe("Nice article");
				expect(response.body.Newcomment.created_by).toBe("Emmy");
				expect(response.body.Newcomment.votes).toEqual([]);
				expect(response.body.Newcomment.total_votes).toBe(0);
			});
	});
	test("POST Status 400 - returns an error when you try to post a comment with an invalid body", () => {
		return request(app)
			.post("/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments")
			.send({ comment_body: 1234, created_by: "Emmy" })
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("Invalid field type");
			});
	});
	test("POST Status 404 - returns an error when you try to post a comment to an article that does not exist", () => {
		return request(app)
			.post("/api/users/articles/648c66086f2a6b6cd84be886/comments")
			.send({ comment_body: "Nice article", created_by: "Emmy" })
			.expect(404)
			.then((response) => {
				expect(response.body.msg).toBe("Article does not exist");
			});
	});
	test("Post - status 400, should return erro when you hvent filled in the required fields", () => {
		return request(app)
			.post("/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments")
			.send({ comment_body: "Nice article" })
			.expect(400)
			.then((response) => {
				expect(response.body.msg).toBe("Missing required fields: created_by");
			});
	});
});

describe("/api/articles/:_id/comments/:comment_id", () => {
	test("PATCH status 200, should patch an comment of the given user", () => {
		return request(app)
			.patch(
				"/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments/6490232f9f9d95ee1fe49391"
			)
			.expect(200)
			.send({ comment_body: "Nice article" })
			.then((response) => {
				expect(response.body.Newcomment.comment_body).toBe("Nice article");
				expect(response.body.Newcomment.created_by).toBe("Emmy");
			});
	});
	test("PATCH status 404, should return an error when you try to patch a comment that does not exist", () => {
		return request(app)
			.patch(
				"/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments/6490232f9f9d95ee1fe49392"
			)
			.expect(404)
			.send({ comment_body: "Nice article" })
			.then((response) => {
				expect(response.body.msg).toBe("Comment does not exist");
			});
	});
	test("PATCH status 400, should return an error when you try to patch a comment with an invalid body", () => {
		return request(app)
			.patch(
				"/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments/6490232f9f9d95ee1fe49391"
			)
			.expect(400)
			.send({ comment_body: 1234 })
			.then((response) => {
				expect(response.body.msg).toBe("Invalid field type");
			});
	});
	test("PATCH status 404, should return an error when you try to patch a field that doesnt exist", () => {
		return request(app)
			.patch(
				"/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e/comments/6490232f9f9d95ee1fe49391"
			)
			.expect(404)
			.send({ comment_body: "Nice article", comment_body2: "Nice article" })
			.then((response) => {
				expect(response.body.msg).toBe("Invalid fields found: comment_body2");
			});
	});
});
