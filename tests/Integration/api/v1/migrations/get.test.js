import database from "infra/database";

beforeAll(async () => {
  await cleanDataBase();
});

async function cleanDataBase() {
  await database.query("DROP schema public cascade; CREATE schema public;");
}

export const getEnvironment = () => {
  const MY_ENVIRONMENT_VARIABLE = process.env.POSTGRES_DB;
  return MY_ENVIRONMENT_VARIABLE;
};

test("GET to /api/v1/migrations should returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const environmentValue = getEnvironment();
  expect(environmentValue).toBe("local_db");

  expect(Array.isArray(responseBody)).toBe(true);

  expect(responseBody.length).toBeGreaterThan(0);
});
