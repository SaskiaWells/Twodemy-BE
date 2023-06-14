const request = require("supertest");
const connection = require("../db/connection");
const { checkFieldExists } = require("../app/utils/utils");
const seed = require("../db/seeds/seed");
const testData = require("../db/seedData/testData/users");

beforeEach(() => seed(testData));

afterAll(() => connection.close());

describe("checkFieldExists()", () => {
  test("will return an error when given a field and value that does not exist", async () => {
    const query = { "topicsToLearn.subject": "Space Sailing" };
    await expect(checkFieldExists("User", query)).rejects.toEqual({
      status: 404,
      msg: "Field does not exist",
    });
  });

  test("will resolve when given a field and value exists", async () => {
    const query = { "topicsToLearn.subject": "Maths" };
    await expect(checkFieldExists("User", query)).resolves.toBeUndefined();
  });
  test("will resolve when given more than one field and value that do exist ", async () => {
    const query = {
      "topicsToLearn.subject": "Maths",
      userName: "coolBoy420",
    };
    await expect(checkFieldExists("User", query)).resolves.toBeUndefined();
  });

  test("will reject with appropriate error when multiple fields are entered but one does not exist", async () => {
    const query = {
      "topicsToLearn.subject": "Maths",
      userName: "LobotomyNow!",
    };
    await expect(checkFieldExists("User", query)).rejects.toEqual({
      status: 404,
      msg: "Field does not exist",
    });
  });
});
