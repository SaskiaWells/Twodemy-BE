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
				console.log(response.body);
				expect(body).toEqual({
					msg: "Missing required field(s): userName, firstName, lastName",
				});
			});
	});
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
				console.log(ratingArr);

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
