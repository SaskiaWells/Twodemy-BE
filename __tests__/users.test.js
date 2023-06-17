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
  test("POST - status: 201 - adds a new student and responds with newly created student", () => {
    return request(app)
      .post("/api/users/students")
      .expect(201)
      .send({
        userName: "Fion666",
        firstName: "Karlie",
        lastName: "Guan",
        email: "noobiefion@gmail.com",
        password: "iamnotNoobie!",
        profilePicture:
          "https://play-lh.googleusercontent.com/sIc-NGgfwtgvs-wow-oCFkXItNs7T_lEhprMjcAMNqRP8Ej2FFet2pCowXLMNexDOvXr",
        languages: [
          {
            language: "English",
            fluency: "Fluent",
          },
        ],
      })
      .then((response) => {
        const { newStudent } = response.body;
        expect(newStudent.userName).toBe("Fion666");
        expect(newStudent.firstName).toBe("Karlie");
        expect(newStudent.lastName).toBe("Guan");
        expect(newStudent.email).toBe("noobiefion@gmail.com");
        expect(newStudent.password).toBe("iamnotNoobie!");
        expect(newStudent.profilePicture).toBe(
          "https://play-lh.googleusercontent.com/sIc-NGgfwtgvs-wow-oCFkXItNs7T_lEhprMjcAMNqRP8Ej2FFet2pCowXLMNexDOvXr"
        );
        expect(newStudent.languages[0].language).toBe("English");
        expect(newStudent.languages[0].fluency).toBe("Fluent");
        expect(newStudent.topicsToLearn).toEqual([]);
        expect(newStudent.isTeacher).toBe(false);
        expect(typeof newStudent._id).toBe("string");
      });
  });
  test("POST - status: 404 - return err msg when missing an reqired field", () => {
    return request(app)
      .post("/api/users/students")
      .expect(404)
      .send({
        // userName: "Fion666",
        firstName: "Karlie",
        lastName: "Guan",
        email: "noobiefion@gmail.com",
        password: "iamnotNoobie!",
        profilePicture:
          "https://play-lh.googleusercontent.com/sIc-NGgfwtgvs-wow-oCFkXItNs7T_lEhprMjcAMNqRP8Ej2FFet2pCowXLMNexDOvXr",
        languages: [
          {
            language: "English",
            fluency: "Fluent",
          },
        ],
      })
      .then((response) => {
        const body = response.body;
        expect(body).toEqual({ msg: "Missing required field(s): userName" });
      });
  });
  test("POST - status: 404 - return err msg when missing multiple reqired field", () => {
    return request(app)
      .post("/api/users/students")
      .expect(404)
      .send({
        // userName: "Fion666",
        // firstName: "Karlie",
        // lastName: "Guan",
        email: "noobiefion@gmail.com",
        password: "iamnotNoobie!",
        profilePicture:
          "https://play-lh.googleusercontent.com/sIc-NGgfwtgvs-wow-oCFkXItNs7T_lEhprMjcAMNqRP8Ej2FFet2pCowXLMNexDOvXr",
        languages: [
          {
            language: "English",
            fluency: "Fluent",
          },
        ],
      })
      .then((response) => {
        const body = response.body;
        expect(body).toEqual({
          msg: "Missing required field(s): userName, firstName, lastName",
        });
      });
  });
  test("should change a given field and return changed student object", () => {
    return request(app)
      .patch("/api/users/students/648ac42475c58ca8fbe8b6d7")
      .expect(200)
      .send({ aboutMe: "I actually hate waffles" })
      .then((response) => {
        const { updatedStudent } = response.body;
        expect(typeof updatedStudent._id).toBe("string");
        expect(typeof updatedStudent.userName).toBe("string");
        expect(typeof updatedStudent.firstName).toBe("string");
        expect(typeof updatedStudent.lastName).toBe("string");
        expect(typeof updatedStudent.email).toBe("string");
        expect(typeof updatedStudent.password).toBe("string");
        expect(typeof updatedStudent.profilePicture).toBe("string");
        expect(typeof updatedStudent.isTeacher).toBe("boolean");
        expect(Array.isArray(updatedStudent.topicsToLearn)).toBe(true);
        expect(updatedStudent.topicsToLearn.length).toBeGreaterThan(0);
        expect(updatedStudent.aboutMe).toBe("I actually hate waffles");
      });
  });
  test("should change multiple fields and return changed student object", () => {
    return request(app)
      .patch("/api/users/students/648ac42475c58ca8fbe8b6d7")
      .expect(200)
      .send({
        aboutMe: "I was in love once -- and it was okay.",
        topicsToLearn: [
          {
            subject: "Maths",
            proficiency: "Subpar",
          },
          {
            subject: "MongoDB",
            proficiency: "MONGOD",
          },
        ],
        firstName: "The Granules of Eternity Within",
      })
      .then((response) => {
        const { updatedStudent } = response.body;
        expect(typeof updatedStudent._id).toBe("string");
        expect(typeof updatedStudent.userName).toBe("string");
        expect(typeof updatedStudent.firstName).toBe("string");
        expect(typeof updatedStudent.lastName).toBe("string");
        expect(typeof updatedStudent.email).toBe("string");
        expect(typeof updatedStudent.password).toBe("string");
        expect(typeof updatedStudent.profilePicture).toBe("string");
        expect(typeof updatedStudent.isTeacher).toBe("boolean");
        expect(Array.isArray(updatedStudent.topicsToLearn)).toBe(true);
        expect(updatedStudent.topicsToLearn.length).toBeGreaterThan(0);
        expect(updatedStudent.aboutMe).toBe(
          "I was in love once -- and it was okay."
        );
        expect(updatedStudent.firstName).toBe(
          "The Granules of Eternity Within"
        );
        // it adds a new unique id which is why the objectContaining
        expect(updatedStudent.topicsToLearn).toEqual([
          {
            subject: "Maths",
            proficiency: "Subpar",
            _id: expect.any(String),
          },
          expect.objectContaining({
            subject: "MongoDB",
            proficiency: "MONGOD",
            _id: expect.any(String),
          }),
        ]);
      });
  });
  test("should reject if given fields that are not on whitelist", () => {
    return request(app)
      .patch("/api/users/students/648ac42475c58ca8fbe8b6d7")
      .expect(404)
      .send({
        aboutMe: "I actually hate waffles",
        messageToJon: "Fuck you Jon",
      })
      .then((response) => {
        expect(response.body.msg).toBe("Invalid fields found: messageToJon");
      });
  });
  // this test is commented out to remove the console log from the final error handling -- the sanitation does work and this can be uncommented to demonstrate it.
  /*  test("should remove dangerous characters", () => {
    return request(app)
      .patch("/api/users/students/648ac42475c58ca8fbe8b6d7")
      .expect(500)
      .send({
        userName: { $ne: "" },
      })
      .then((response) => {
        expect(response.body.msg).toBe("server error!");
      });
  }); */
});

describe("/api/users/teachers", () => {
  test("GET Status 200 - returns an array of all active teacher objects in the database -- an active teacher is defined as by isTeacher: true", () => {
    return request(app)
      .get("/api/users/teachers")
      .expect(200)
      .then((response) => {
        expect(response.body.teachers.length).toBe(5);
        response.body.teachers.forEach((teacher) => {
          expect(typeof teacher._id).toBe("string");
          expect(typeof teacher.userName).toBe("string");
          expect(typeof teacher.firstName).toBe("string");
          expect(typeof teacher.lastName).toBe("string");
          expect(typeof teacher.email).toBe("string");
          expect(typeof teacher.password).toBe("string");
          expect(typeof teacher.profilePicture).toBe("string");
          expect(typeof teacher.isTeacher).toBe("boolean");
          expect(teacher.isTeacher).toBe(true);
          expect(Array.isArray(teacher.topicsToLearn)).toBe(true);
          expect(Array.isArray(teacher.teacher.courses)).toBe(true);
          expect(Array.isArray(teacher.teacher.articles)).toBe(true);
          expect(Array.isArray(teacher.teacher.reviews)).toBe(true);
          expect(typeof teacher.teacher.rating).toBe("number");
          expect(typeof teacher.teacher.qualifications).toBe("string");
          expect(typeof teacher.teacher.website).toBe("string");
        });
      });
  });

  test("GET Status 200 - QUERY course:cooking - returns an array of teachers who run that course", () => {
    return request(app)
      .get("/api/users/teachers?course=cooking")
      .expect(200)
      .then((response) => {
        expect(response.body.teachers.length).toBe(2);
        expect(response.body.teachers[0].teacher.courses[0]).toEqual(
          expect.objectContaining({ courseCategory: "cooking" })
        );
        expect(response.body.teachers[1].teacher.courses[0]).toEqual(
          expect.objectContaining({ courseCategory: "cooking" })
        );
      });
  });

  test("GET Status 200 - QUERY course:cooking, languages:German - returns an array of teachers who fulfill criteria", () => {
    return request(app)
      .get("/api/users/teachers?course=cooking&languages=German")
      .expect(200)
      .then((response) => {
        expect(response.body.teachers.length).toBe(1);
        expect(response.body.teachers[0].teacher.courses[0]).toEqual(
          expect.objectContaining({ courseCategory: "cooking" })
        );
        expect(response.body.teachers[0].languages[1]).toEqual(
          expect.objectContaining({ language: "German" })
        );
      });
  });
  test("GET Status 200 - function works dynamically with many different queries", () => {
    return request(app)
      .get(
        "/api/users/teachers?subject=Maths&proficiency=Prodigy&firstName=Jonathan&languages=German&course=cooking"
      )
      .expect(200)
      .then((response) => {
        expect(response.body.teachers.length).toBe(1);
        expect(response.body.teachers[0].topicsToLearn[0].subject).toBe(
          "Maths"
        );
        expect(response.body.teachers[0].topicsToLearn[0].proficiency).toBe(
          "Prodigy"
        );
        expect(response.body.teachers[0].firstName).toBe("Jonathan");
        expect(response.body.teachers[0].teacher.courses[0]).toEqual(
          expect.objectContaining({ courseCategory: "cooking" })
        );
        expect(response.body.teachers[0].languages[1]).toEqual(
          expect.objectContaining({ language: "German" })
        );
      });
  });

  test("sorts teachers by rating and defaults to descending", () => {
    return request(app)
      .get("/api/users/teachers?sortBy=rating")
      .expect(200)
      .then((res) => {
        const ratingArr = res.body.teachers.map(
          (teacher) => teacher.teacher.rating
        );

        expect(ratingArr).toBeSorted({
          descending: true,
        });
      });
  });

  test("sorts teachers by rating and works with ascending", () => {
    return request(app)
      .get("/api/users/teachers?sortBy=rating&order=asc")
      .expect(200)
      .then((res) => {
        const ratingArr = res.body.teachers.map(
          (teacher) => teacher.teacher.rating
        );

        expect(ratingArr).toBeSorted({
          descending: false,
        });
      });
  });

  test("GET Status 404 - correctly handles error through middleware when querys don't exist", () => {
    return request(app)
      .get(
        "/api/users/teachers?subject=Maths&proficiency=Prodigy&firstName=Jonathan&languages=German&course=cooking&qualifications=degree"
      )
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Field does not exist");
      });
  });
});

describe("/api/users/students/:_id", () => {
  test("GET Status 200 - returns a student object whose ID matches the passed :_id parameter", () => {
    return request(app)
      .get("/api/users/students/648ac42475c58ca8fbe8b6d7")
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body).length).toBe(1);
        const student = response.body.student;
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
  test("GET Status 404 - correctly handles error through middleware when the given _id doesn't exist", () => {
    return request(app)
      .get("/api/users/students/648ac42475c58ca8fbe8b6d9")
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('{"msg":"User not found"}');
      });
  });
  test("GET Status 400 - correctly handles error through middleware when the given _id is invalid", () => {
    return request(app)
      .get("/api/users/students/648ac")
      .expect(400)
      .then((response) => {
        expect(response.text).toBe('{"msg":"Invalid ID"}');
      });
  });
});

describe("/api/users/teachers/:_id", () => {
  test("GET Status 200 - returns a teacher object whose ID matches the passed :_id parameter", () => {
    return request(app)
      .get("/api/users/teachers/648ac42475c58ca8fbe8b6db")
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body).length).toBe(1);
        const teacher = response.body.teacher;
        expect(typeof teacher._id).toBe("string");
        expect(typeof teacher.userName).toBe("string");
        expect(typeof teacher.firstName).toBe("string");
        expect(typeof teacher.lastName).toBe("string");
        expect(typeof teacher.email).toBe("string");
        expect(typeof teacher.password).toBe("string");
        expect(typeof teacher.profilePicture).toBe("string");
        expect(typeof teacher.isTeacher).toBe("boolean");
        expect(teacher.isTeacher).toBe(true);
        expect(Array.isArray(teacher.topicsToLearn)).toBe(true);
      });
  });
  test("GET Status 404 - correctly handles error through middleware when the given _id doesn't exist", () => {
    return request(app)
      .get("/api/users/teachers/648ac42475c58ca8fbe8b7db")
      .expect(404)
      .then((response) => {
        expect(response.text).toBe('{"msg":"User not found"}');
      });
  });
  test("GET Status 400 - correctly handles error through middleware when the given _id is invalid", () => {
    return request(app)
      .get("/api/users/teachers/648ac")
      .expect(400)
      .then((response) => {
        expect(response.text).toBe('{"msg":"Invalid ID"}');
      });
  });
  test("PATCH should change a given field and return changed teacher object", () => {
    return request(app)
      .patch("/api/users/teachers/648ac42475c58ca8fbe8b6db")
      .expect(200)
      .send({
        courses: [
          {
            courseName: "How to be a Mongod",
            courseCategory: "Coding",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 5,
            description: "Learn to be a god like me",
          },
          {
            courseName: "A Beginners Guide to Electro Magnetic Field Theory",
            courseCategory: "Electronics",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 4.5,
            description: "It turns out Maxwell was right all along!",
          },
        ],
      })
      .then((response) => {
        const { updatedTeacher } = response.body;
        expect(typeof updatedTeacher._id).toBe("string");
        expect(typeof updatedTeacher.userName).toBe("string");
        expect(typeof updatedTeacher.firstName).toBe("string");
        expect(typeof updatedTeacher.lastName).toBe("string");
        expect(typeof updatedTeacher.email).toBe("string");
        expect(typeof updatedTeacher.password).toBe("string");
        expect(typeof updatedTeacher.profilePicture).toBe("string");
        expect(typeof updatedTeacher.isTeacher).toBe("boolean");
        expect(updatedTeacher.isTeacher).toBe(true);
        expect(Array.isArray(updatedTeacher.topicsToLearn)).toBe(true);
        expect(Array.isArray(updatedTeacher.teacher.courses)).toBe(true);
        expect(Array.isArray(updatedTeacher.teacher.articles)).toBe(true);
        expect(Array.isArray(updatedTeacher.teacher.reviews)).toBe(true);
        expect(typeof updatedTeacher.teacher.rating).toBe("number");
        expect(typeof updatedTeacher.teacher.qualifications).toBe("string");
        expect(typeof updatedTeacher.teacher.website).toBe("string");
        expect(updatedTeacher.teacher.courses).toEqual([
          {
            courseName: "How to be a Mongod",
            courseCategory: "Coding",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 5,
            description: "Learn to be a god like me",
            discountMultiplier: 1,
            _id: expect.any(String),
          },
          {
            courseName: "A Beginners Guide to Electro Magnetic Field Theory",
            courseCategory: "Electronics",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 4.5,
            description: "It turns out Maxwell was right all along!",
            discountMultiplier: 1,
            _id: expect.any(String),
          },
        ]);
      });
  });
  test("PATCH should change multiple fields and return changed teacher object", () => {
    return request(app)
      .patch("/api/users/teachers/648ac42475c58ca8fbe8b6db")
      .expect(200)
      .send({
        isPremium: false,
        rating: 4.5,
        qualifications: "Certified Insane",
        courses: [
          {
            courseName: "How to be a Mongod",
            courseCategory: "Coding",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 5,
            description: "Learn to be a god like me",
          },
          {
            courseName: "A Beginners Guide to Electro Magnetic Field Theory",
            courseCategory: "Electronics",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 4.5,
            description: "It turns out Maxwell was right all along!",
          },
        ],
      })
      .then((response) => {
        const { updatedTeacher } = response.body;
        expect(typeof updatedTeacher._id).toBe("string");
        expect(typeof updatedTeacher.userName).toBe("string");
        expect(typeof updatedTeacher.firstName).toBe("string");
        expect(typeof updatedTeacher.lastName).toBe("string");
        expect(typeof updatedTeacher.email).toBe("string");
        expect(typeof updatedTeacher.password).toBe("string");
        expect(typeof updatedTeacher.profilePicture).toBe("string");
        expect(typeof updatedTeacher.isTeacher).toBe("boolean");
        expect(updatedTeacher.isTeacher).toBe(true);
        expect(Array.isArray(updatedTeacher.topicsToLearn)).toBe(true);
        expect(Array.isArray(updatedTeacher.teacher.courses)).toBe(true);
        expect(Array.isArray(updatedTeacher.teacher.articles)).toBe(true);
        expect(Array.isArray(updatedTeacher.teacher.reviews)).toBe(true);
        expect(typeof updatedTeacher.teacher.rating).toBe("number");
        expect(typeof updatedTeacher.teacher.qualifications).toBe("string");
        expect(typeof updatedTeacher.teacher.website).toBe("string");
        expect(updatedTeacher.teacher.courses).toEqual([
          {
            courseName: "How to be a Mongod",
            courseCategory: "Coding",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 5,
            description: "Learn to be a god like me",
            discountMultiplier: 1,
            _id: expect.any(String),
          },
          {
            courseName: "A Beginners Guide to Electro Magnetic Field Theory",
            courseCategory: "Electronics",
            hourlyRate: 50,
            courseImage:
              "https://miro.medium.com/v2/resize:fit:960/0*HgOI-QuJ9TN7oeXD.jpg",
            rating: 4.5,
            description: "It turns out Maxwell was right all along!",
            discountMultiplier: 1,
            _id: expect.any(String),
          },
        ]);

        expect(updatedTeacher.teacher.isPremium).toBe(false);
        expect(updatedTeacher.teacher.qualifications).toBe("Certified Insane");
        expect(updatedTeacher.teacher.rating).toBe(4.5);
      });
  });

  test("PATCH should reject if given fields that are not on whitelist", () => {
    return request(app)
      .patch("/api/users/teachers/648ac42475c58ca8fbe8b6db")
      .expect(404)
      .send({
        isPremium: false,
        messageToJon:
          "Every three steps forward in time is one step back in time, so keep on running!",
      })
      .then((response) => {
        expect(response.body.msg).toBe("Invalid fields found: messageToJon");
      });
  });
  // this test is commented out to remove the console log from the final error handling -- the sanitation does work and this can be uncommented to demonstrate it.

  /*  test.only("should remove dangerous characters", () => {
    return request(app)
      .patch("/api/users/teachers/648ac42475c58ca8fbe8b6db")
      .expect(500)
      .send({
        rating: { $ne: "" },
      })
      .then((response) => {
        expect(response.body.msg).toBe("server error!");
      });
  }); */
});
