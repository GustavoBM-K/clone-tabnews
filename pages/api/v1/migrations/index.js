import migrationRunner from "node-pg-migrate";
import { resolve } from "path";
import database from "infra/database";
import { createRouter } from "next-connect";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();
router.get(getHandler);

router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  console.log("\n Erro dentro do catch do next-connect: ");
  console.log(publicErrorObject);

  response.status(500).json(publicErrorObject);
}

async function getHandler(request, response) {}

export default async function status(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method "${request.method}" not allowed` })
      .end();
  }

  let dbClient;
  try {
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
  } catch (error) {
    console.error("Error during migration:", error);
    throw error;
  } finally {
    dbClient.end();
  }
}
