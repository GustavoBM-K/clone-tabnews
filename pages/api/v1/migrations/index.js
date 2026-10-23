import migrationRunner from "node-pg-migrate";
import { resolve } from "path";
import database from "infra/database";
import { createRouter } from "next-connect";
import { InternalServerError } from "infra/errors";

const router = createRouter();
router.get(getHandler);
router.post(getHandler);

export default router.handler({
  onError: onErrorHandler,
});

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  console.log("\n Erro dentro do catch do next-connect: ");
  console.log(publicErrorObject);

  response.status(500).json(publicErrorObject);
}

async function getHandler(request, response) {
  let dbClient;

  dbClient = await database.getNewClient();

  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: resolve("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
    noLock: true,
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }
}
