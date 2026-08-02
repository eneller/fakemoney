//Dev-Script
//Runs `npm run dev-bg` and listens for interrupts to execute `npm run teardown`
import { spawn } from "node:child_process";

let isShuttingDown = false;

const child = spawn("npm", ["run", "dev-bg"], {
  stdio: "inherit",
  shell: true,
});

async function teardown() {
  console.log("Running teardown...");
  const teardownProcess = spawn("npm", ["run", "teardown"], {
    stdio: "inherit",
    shell: true,
    detached: true
  });

  await new Promise((resolve) => teardownProcess.on("exit", resolve));
}

async function shutdown(signal: any) {
  if(isShuttingDown) return;
  isShuttingDown = true;
  child.kill(signal);
  await teardown();
  process.exit();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

child.on("exit", async (code) => {
  process.exit(code ?? 0);
});
