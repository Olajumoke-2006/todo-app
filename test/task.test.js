const request = require("supertest");
const app = require("../app");

describe("Tasks API", () => {
  it("should fail without auth", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401);
  });
});