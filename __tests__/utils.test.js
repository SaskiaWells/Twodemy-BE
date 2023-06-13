const request = require("supertest");
const connection = require("../db/connection");
const { checkFieldExists } = require("../app/utils/utils");
const seed = require("../db/seeds/seed");
const testData = require("../db/seedData/testData/users");

beforeEach(() => seed(testData));

afterAll(() => connection.close());

describe("checkFieldExists()", () => {
  test("will return an error when given a field and value does not exist", async () => {
    await expect(
      checkFieldExists("User", "topicsToLearn.subject", "Space Sailing")
    ).rejects.toEqual({ status: 404, msg: "Field does not exist" });
  });
  test("will return an error when given a field and value does not exist", async () => {
    await expect(
      checkFieldExists("User", "topicsToLearn.subject", "Maths")
    ).resolves.toBeUndefined();
  });
});
