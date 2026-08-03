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
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      <p>Última atualização: {updatedAtText} </p>
    </div>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let databaseStatusConnection = "Carregando...";

  if (!isLoading && data) {
    databaseStatusConnection = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Máximo de conexões: {data.dependencies.database.max_connections}
        </div>
        <div>
          Conexões utilizadas: {data.dependencies.database.used_connections}
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>Database</h1>
      <div>{databaseStatusConnection}</div>
    </div>
  );
}
