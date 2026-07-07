const { spawn } = require("child_process");

const dev = spawn("npm", ["run", "dev:only"], {
  stdio: "inherit",
  shell: true,
});

let shuttingDown = false;

function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log("\nParando containers...");

  const down = spawn("npm", ["run", "docker:down"], {
    stdio: "inherit",
    shell: true,
  });

  down.on("close", () => {
    dev.kill("SIGINT");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

dev.on("exit", (code) => {
  if (!shuttingDown) {
    process.exit(code);
  }
});
