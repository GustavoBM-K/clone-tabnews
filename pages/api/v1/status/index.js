import database from "infra/database.js";
import { InternalServerError } from "infra/errors";
async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    const databaseVersion = await database.query("SHOW server_version;");
    const databaseVersionValue = databaseVersion.rows[0].server_version;

    const databaseMaxConnections = await database.query(
      "SHOW max_connections;",
    );
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
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\n Erro dentro do catch do Controller: ");
    console.log(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}

export default status;
