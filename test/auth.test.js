const request = require("supertest");
const app = require("../app");

describe("Auth", () => {
  it("should register user", async () => {
    const res = await request(app)
      .post("/register")
      .send({ username: "test", password: "1234" });

    expect(res.statusCode).toBe(302);
  });
});