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
            console.log(response.body)
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
          expect(Array.isArray(article.votes) ).toBe(true);
          expect(Array.isArray(article.comments)).toBe(true);
          
        });
      });
  });
});
