const request = require("supertest");
const app = require("../app/app.js");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/seedData/testData/users.js");

beforeEach(() => seed(testData));

afterAll(() => connection.close());

describe("/api/users/courses", () => {
  test("GET Status 200 - returns an array of all active teacher objects in the database -- an active teacher is defined as by isTeacher: true", () => {
    return request(app)
      .get("/api/users/courses")
      .expect(200)
      .then((response) => {
        expect(response.body.courses.length).toBe(4);
        response.body.courses.forEach((course) => {
          expect(typeof course._id).toBe("string");
          expect(typeof course.courseName).toBe("string");
          expect(typeof course.courseCategory).toBe("string");
          expect(typeof course.hourlyRate).toBe("number");
          expect(typeof course.courseImage).toBe("string");
          expect(typeof course.rating).toBe("number");
          expect(typeof course.description).toBe("string");
          expect(typeof course.discountMultiplier).toBe("number");
        });
      });
  });
  test("GET Status 200 - QUERY category:cooking - courses with that category", () => {
    return request(app)
      .get("/api/users/courses?course=cooking")
      .expect(200)
      .then((response) => {
        expect(response.body.courses.length).toBe(2);
        expect(response.body.courses[0].courseCategory).toBe("cooking");
        expect(response.body.courses[0].courseCategory).toBe("cooking");
      });
  });
  test("GET Status 200 - QUERY course:cooking, cost:10 - returns an array of courses that fulfill criteria", () => {
    return request(app)
      .get("/api/users/courses?course=cooking&cost=10")
      .expect(200)
      .then((response) => {
        expect(response.body.courses.length).toBe(1);
        expect(response.body.courses[0].courseCategory).toBe("cooking");
        expect(response.body.courses[0].hourlyRate).toBe(10);
      });
  });

  test("GET Status 200 - function works dynamically with many different queries", () => {
    return request(app)
      .get("/api/users/courses?course=cooking&courseRating=4.7")
      .expect(200)
      .then((response) => {
        expect(response.body.courses.length).toBe(1);
        expect(response.body.courses[0].courseCategory).toBe("cooking");
        expect(response.body.courses[0].hourlyRate).toBe(10);
        expect(response.body.courses[0].rating).toBe(4.7);
      });
  });
  test("GET Status 200 - function will get range of greater than ratings if specified", () => {
    return request(app)
      .get("/api/users/courses?courseRating=>4.7")
      .expect(200)
      .then((response) => {
        expect(response.body.courses.length).toBe(1);
        expect(response.body.courses[0].courseCategory).toBe("Coding");
        expect(response.body.courses[0].hourlyRate).toBe(50);
        expect(response.body.courses[0].rating).toBe(5);
      });
  });
  test("GET Status 200 - function will get range of less than ratings if specified", () => {
    return request(app)
      .get("/api/users/courses?courseRating=<5")
      .expect(200)
      .then((response) => {
        expect(response.body.courses.length).toBe(3);
      });
  });
  test("GET Status 200 - if courseList:true then function will provide a list of distinct courses", () => {
    return request(app)
      .get("/api/users/courses?courseList=true")
      .expect(200)
      .then((response) => {
        expect(response.body.courses.length).toBe(3);
        expect(response.body.courses).toEqual([
          "Coding",
          "cooking",
          "lifestyle",
        ]);
      });
  });
  test("sorts courses by rating and defaults to descending", () => {
    return request(app)
      .get("/api/users/courses?sortBy=courseRating")
      .expect(200)
      .then((res) => {
        const ratingArr = res.body.courses.map((course) => course.rating);

        expect(ratingArr).toBeSorted({
          descending: true,
        });
      });
  });
  test("sorts courses by cost and works with ascending", () => {
    return request(app)
      .get("/api/users/courses?sortBy=courseRating&order=asc")
      .expect(200)
      .then((res) => {
        const ratingArr = res.body.courses.map((course) => course.rating);
        expect(ratingArr).toBeSorted({
          descending: false,
        });
      });
  });
// These are bens tests  
});

describe("/api/users/courses/:_id", () => {
	test("GET Status 200 - returns a course object whose ID matches the passed :_id parameter", () => {
		return request(app)
			.get("/api/users/courses/649021d2723d2de51b0cbd91")
			.expect(200)
			.then((response) => {
				expect(Object.keys(response.body).length).toBe(1);
				const course = response.body.course;
				expect(typeof course._id).toBe("string");
				expect(typeof course.courseName).toBe("string");
				expect(typeof course.courseCategory).toBe("string");
				expect(typeof course.hourlyRate).toBe("number");
				expect(typeof course.courseImage).toBe("string");
				expect(typeof course.rating).toBe("number");
				expect(typeof course.description).toBe("string");
				expect(course._id).toBe("649021d2723d2de51b0cbd91");
			});
	});
  test("GET Status 404 - correctly handles error through middleware when the given _id doesn't exist", () => {
		return request(app)
			.get("/api/users/courses/648ac42475c58ca8fbe8b9fa")
			.expect(404)
			.then((response) => {
				expect(response.text).toBe('{"msg":"Course not found"}');
			});
	});
  test("GET Status 400 - correctly handles error through middleware when the given _id is invalid", () => {
		return request(app)
			.get("/api/users/courses/9948")
			.expect(400)
			.then((response) => {
				expect(response.text).toBe('{"msg":"Invalid ID"}');
			});
	});
});

describe.only("/api/users/courses/categories", () => { 
  test('GET Status 200 - returns an array of all cousre categories', () => {
    return request(app)
    .get('/api/users/courses/categories')
    .expect(200)
    .then((response) => {
      expect(response.body.categories.length).toBe(3);
      expect(response.body.categories).toEqual(["Coding", "cooking", "lifestyle"]);
    })
  })


})
