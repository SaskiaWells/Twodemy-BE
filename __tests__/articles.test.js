const request = require("supertest");
const app = require("../app/app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/seedData/testData/users.js");

beforeEach(() => seed(testData));

afterAll(() => connection.close());

describe("/api/articles", () => {
	test("GET Status 200 - returns an array of all articles", () => {
		return request(app)
			.get("/api/users/articles")
			.expect(200)
			.then((response) => {
				expect(response.body.articles.length).toBe(4);
				response.body.articles.forEach((article) => {
					expect(typeof article._id).toBe("string");
					expect(typeof article.article_title).toBe("string");
					expect(typeof article.article_category).toBe("string");
					expect(typeof article.article_img).toBe("string");
					expect(typeof article.article_blurb).toBe("string");
					expect(typeof article.article_body).toBe("string");
					expect(typeof article.created_by).toBe("string");
					expect(typeof article.created_at).toBe("string");
					expect(Array.isArray(article.votes)).toBe(true);
					expect(Array.isArray(article.comments)).toBe(true);
				});
			});
	});
});

describe("/api/users/articles/:_id", () => {
	test("GET Status 200 - returns an article object whose ID matches the passed :_id parameter", () => {
		return request(app)
			.get("/api/users/articles/648ac42475c58ca8fbe8b6ff")
			.expect(200)
			.then((response) => {
				expect(Object.keys(response.body).length).toBe(1);
				const article = response.body.article;
				expect(typeof article.article_title).toBe("string");
				expect(typeof article.article_category).toBe("string");
				expect(typeof article.article_img).toBe("string");
				expect(typeof article.article_body).toBe("string");
				expect(typeof article.created_by).toBe("string");
				expect(typeof article.comments).toBe("object");
				expect(Array.isArray(article.comments)).toBe(true);
				expect(typeof article._id).toBe("string");
				expect(article._id).toBe("648ac42475c58ca8fbe8b6ff");
				expect(typeof article.created_at).toBe("string");
				expect(typeof article.votes).toBe("object");
				expect(Array.isArray(article.votes)).toBe(true);
				expect(article.article_blurb.length).toBeLessThan(101);
			});
	});
	test("GET Status 404 - correctly handles error through middleware when the given _id doesn't exist", () => {
		return request(app)
			.get("/api/users/articles/648ac42475c58ca8fbe8b9ff")
			.expect(404)
			.then((response) => {
				expect(response.text).toBe('{"msg":"Article not found"}');
			});
	});
	test("GET Status 400 - correctly handles error through middleware when the given _id is invalid", () => {
		return request(app)
			.get("/api/users/articles/648ac")
			.expect(400)
			.then((response) => {
				expect(response.text).toBe('{"msg":"Invalid ID"}');
			});
	});
});
