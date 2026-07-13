import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

const getEnvironment = () => {
  const MY_ENVIRONMENT_VARIABLE = process.env.POSTGRES_DB;
  return MY_ENVIRONMENT_VARIABLE;
};

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving peding migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const environmentValue = getEnvironment();
      expect(environmentValue).toBe("local_db");

      expect(Array.isArray(responseBody)).toBe(true);

      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
