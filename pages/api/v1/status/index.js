import { createRouter } from "next-connect";
import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/errors";

const router = createRouter();
router.get(getHandler);

export default router.handler({
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

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersion.rows[0].server_version;

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnections.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseUsedConnections = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });

  const databaseUsedConnectionsValue = databaseUsedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        used_connections: databaseUsedConnectionsValue,
      },
    },
  });
}
