const request = require("supertest");
const app = require("../app/app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/seedData/testData/users.js");
const mongoose = require("mongoose");

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
  test("GET Status 200 - QUERY article_category:Quantum Physics - artilce with that category", () => {
    return request(app)
      .get("/api/users/articles?article_category=Quantum Physics")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(typeof article.article_title).toBe("string");
          expect(article.article_category).toBe("Quantum Physics");
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

  test("GET status 200  QUERY article_title:Basics of music - artilce with that author", () => {
    return request(app)
      .get("/api/users/articles?article_title=Basics of music")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article.article_title).toBe("Basics of music");
          expect(typeof article.article_category).toBe("string");
          expect(typeof article.article_img).toBe("string");
          expect(typeof article.article_blurb).toBe("string");
          expect(typeof article.article_body).toBe("string");
          expect(article.created_by).toBe("musicTeacher");
          expect(typeof article.created_at).toBe("string");
          expect(Array.isArray(article.votes)).toBe(true);
          expect(Array.isArray(article.comments)).toBe(true);
        });
      });
  });

  test("GET Status 200 - QUERY author:CadenGG - artilce with that author", () => {
    return request(app)
      .get("/api/users/articles?author=CadenGG")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(typeof article.article_title).toBe("string");
          expect(typeof article.article_category).toBe("string");
          expect(typeof article.article_img).toBe("string");
          expect(typeof article.article_blurb).toBe("string");
          expect(typeof article.article_body).toBe("string");
          expect(article.created_by).toBe("CadenGG");
          expect(typeof article.created_at).toBe("string");
          expect(Array.isArray(article.votes)).toBe(true);
          expect(Array.isArray(article.comments)).toBe(true);
        });
      });
  });

  test("GET Status 200 - QUERY article_date:2023 - should return all articles in that year", () => {
    return request(app)
      .get("/api/users/articles?article_date=2023")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(typeof article.article_title).toBe("string");
          expect(typeof article.article_category).toBe("string");
          expect(typeof article.article_img).toBe("string");
          expect(typeof article.article_blurb).toBe("string");
          expect(typeof article.article_body).toBe("string");
          expect(typeof article.created_by).toBe("string");
          expect(article.created_at.slice(0, 4)).toBe("2023");
          expect(Array.isArray(article.votes)).toBe(true);
          expect(Array.isArray(article.comments)).toBe(true);
        });
      });
  });
  test("GET Status 200 - QUERY article_date:2022 - should return all articles in that year (empty array)", () => {
    return request(app)
      .get("/api/users/articles?article_date=2022")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(0);
      });
  });
  test("GET Status 200 - QUERY article_votes=0 - should return all the artilces with 0 votes", () => {
    return request(app)
      .get("/api/users/articles?article_votes=0")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article.total_votes).toBe(0);
        });
      });
  });
  test("GET Status 200 - QUERY article_votes=>-1 - should return all the artilces with greater than -1 votes ", () => {
    return request(app)
      .get("/api/users/articles?article_votes=>-1")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article.total_votes).toBeGreaterThan(-1);
        });
      });
  });

  test("GET Status 200 - QUERY article_votes=<1 - should return all the artilces with less than 1 votes ", () => {
    return request(app)
      .get("/api/users/articles?article_votes=<1")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(article.total_votes).toBeLessThan(1);
        });
      });
  });

  test("sorts articles by votes and defaults to descending", () => {
    return request(app)
      .get("/api/users/articles?sortBy=total_votes")
      .expect(200)
      .then((res) => {
        const total_votesArr = res.body.articles.map(
          (article) => article.total_votes
        );
        expect(total_votesArr).toBeSorted({
          descending: true,
        });
      });
  });
  test("sorts articles by votes and works with ascending", () => {
    return request(app)
      .get("/api/users/articles?sortBy=total_votes&order=asc")
      .expect(200)
      .then((res) => {
        const total_votesArr = res.body.articles.map(
          (article) => article.total_votes
        );
        expect(total_votesArr).toBeSorted({
          descending: false,
        });
      });
  });
  test("sorts articles by date and works with ascending", () => {
    return request(app)
      .get("/api/users/articles?sortBy=date&order=asc")
      .expect(200)
      .then((res) => {
        const dateArr = res.body.articles.map((article) => article.created_at);
        expect(dateArr).toBeSorted({
          descending: false,
        });
      });
  });
  test("sorts articles by date and defaults to descending", () => {
    return request(app)
      .get("/api/users/articles?sortBy=date")
      .expect(200)
      .then((res) => {
        const dateArr = res.body.articles.map((article) => article.created_at);
        expect(dateArr).toBeSorted({
          descending: true,
        });
      });
  });
  test("can have multiple queries on the article", () => {
    return request(app)
      .get("/api/users/articles?article_date=2023&article_votes=0")
      .expect(200)
      .then((response) => {
        response.body.articles.forEach((article) => {
          expect(typeof article.article_title).toBe("string");
          expect(typeof article.article_category).toBe("string");
          expect(typeof article.article_img).toBe("string");
          expect(typeof article.article_blurb).toBe("string");
          expect(typeof article.article_body).toBe("string");
          expect(typeof article.created_by).toBe("string");
          expect(article.created_at.slice(0, 4)).toBe("2023");
          expect(article.total_votes).toBe(0);
          expect(Array.isArray(article.comments)).toBe(true);
        });
      });
  });
});

describe("/api/users/articles/:_id", () => {
  test("GET Status 200 - returns an article object whose ID matches the passed :_id parameter", () => {
    return request(app)
      .get("/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e")
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
        expect(article._id).toBe("5f760b7a9b3d9b0b1c9b4b1e");
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
  test(" DELETE - should delete article", async () => {
    await request(app)
      .delete("/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e")
      .expect(204);
    const response = await request(app).get(
      "/api/users/articles/5f760b7a9b3d9b0b1c9b4b1e"
    );
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Article not found");
  });
  test(" DELETE - should throw an invalid artiel id error if invalid id is passed", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .delete(`/api/users/articles/${nonExistentId}1`)
      .expect(400);
    expect(response.body.msg).toBe("Invalid article ID");
  });
  test("should throw an article not found error if invalid username is given", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .delete(`/api/users/articles/${nonExistentId}`)
      .expect(404);
    expect(response.body.msg).toBe("Article not found");
  });
  test("should post article", () => {
    return request(app)
      .post("/api/users/articles/648ac42475c58ca8fbe8b6db")
      .expect(201)
      .send({
        article_title: "Article: An Article",
        article_category: "Science!",
        article_img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBfxlkgyIxT9acfseki4GxQTB3Td8e6yGyw&usqp=CAU",
        article_body:
          "Once upon a time there was a being called Jon, and at another point in time there wasn't. Sinister.",
        created_by: "Jon!!!!!!!!",
        article_blurb:
          "This blurb is going to be longer than the article, perhaps because the article is shit,",
      })
      .then((response) => {
        const { newArticle } = response.body;
        console.log(newArticle);
        expect(newArticle.article_title).toBe("Article: An Article");
        expect(typeof newArticle.article_category).toBe("string");
        expect(typeof newArticle.article_body).toBe("string");
        expect(newArticle.created_by).toBe("Jon!!!!!!!!");
        expect(typeof newArticle.article_blurb).toBe("string");
        expect(newArticle.hasOwnProperty("created_at")).toBe(true);
        expect(newArticle.hasOwnProperty("votes")).toBe(true);
        expect(newArticle.hasOwnProperty("comments")).toBe(true);
      });
  });
});
