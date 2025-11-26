import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 90/10 AS result;");
  console.log("Request at", new Date(), request.headers["user-agent"]);
  console.log(result.rows);
  response.status(200).json({ status: "Estão funcionando!" });
}

export default status;
