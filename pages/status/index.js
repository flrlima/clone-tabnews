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
      <UpdateAt />
      <DatabaseStatus />
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
    dedupingInterval: 5000,
  });

  const loading = "Carregando...";

  let updateAtText = loading;

  if (!isLoading && data) {
    updateAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <div>Útilma atualização: {updateAtText}</div>
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000,
    dedupingInterval: 5000,
  });

  const loading = "Carregando...";

  let databaseStatusInformation = loading;
  console.log(data);

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>
          Conexões máximas: {data.dependencies.database.max_connections}
        </div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>Versão do node: {data.dependencies.database.version}</div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
