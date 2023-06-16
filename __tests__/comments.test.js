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
    });


