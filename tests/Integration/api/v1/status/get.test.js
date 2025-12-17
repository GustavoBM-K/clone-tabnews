test("GET to /api/v1/status should returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.11");

  const databaseMaxConnections =
    responseBody.dependencies.database.max_connections;
  expect(typeof databaseMaxConnections).toBe("number");

  expect(databaseMaxConnections).toEqual(100);

  const databaseUsedConnections =
    responseBody.dependencies.database.used_connections;
  expect(databaseUsedConnections).toEqual(1);
});
