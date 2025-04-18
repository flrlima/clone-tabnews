import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersinResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersinResult.rows[0].server_version;

  const databaseMaxConnectuionsResult = await database.query(
    "SHOW max_connections",
  );

  const databaseMaxConnectionsValue =
    databaseMaxConnectuionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
