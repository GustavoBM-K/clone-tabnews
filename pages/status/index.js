import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let version;
  let max_connections;
  let used_connections;

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    version = data.dependencies.database.version;
    max_connections = data.dependencies.database.max_connections;
    used_connections = data.dependencies.database.used_connections;
  }

  return (
    <div>
      <p>Última atualização: {updatedAtText} </p>
      <p>Versão: {version}</p>
      <p>Máximo de conexões: {max_connections}</p>
      <p>Conexões utilizadas: {used_connections}</p>
    </div>
  );
}
