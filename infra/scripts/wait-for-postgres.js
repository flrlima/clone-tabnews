const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handlerReturn);

  function handlerReturn(error, stdount) {
    if (stdount.search("accepting connections") === -1) {
      console.log("🕒 Não está aceitando conexões ainda.");

      checkPostgres();
      return;
    }

    console.log("🟢 Postgres está pronto e aceitando conexões.\n");
  }
}

console.log("\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
