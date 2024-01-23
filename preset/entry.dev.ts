import "#internal/nitro/virtual/polyfill";
import { Server } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdirSync } from "node:fs";
import { threadId, parentPort } from "node:worker_threads";
import { isWindows, provider } from "std-env";
import { toNodeListener } from "h3";
const nitroApp = useNitroApp();
import { trapUnhandledNodeErrors } from "#internal/nitro/utils";
import {Server as SocketServer} from "socket.io";
import {socketHandler} from "~/socket/handler";

const server = new Server(toNodeListener(nitroApp.h3App));

function getAddress() {
  if (
    provider === "stackblitz" ||
    process.env.NITRO_NO_UNIX_SOCKET ||
    process.versions.bun
  ) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (isWindows) {
    return join("\\\\.\\pipe\\nitro", socketName);
  } else {
    const socketDir = join(tmpdir(), "nitro");
    mkdirSync(socketDir, { recursive: true });
    return join(socketDir, socketName);
  }
}

const listenAddress = getAddress();
const listener = server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort.postMessage({
    event: "listen",
    address:
      typeof _address === "string"
        ? { socketPath: _address }
        : { host: "localhost", port: _address.port },
  });
});

const io = new SocketServer(server, {
  transports: ["polling"] // Added on dev because hmr keeps breaking when socket.io websocket connects
})
socketHandler(io);
nitroApp.hooks.hook("request", (event)  => {
  event["_socket"] = io
})

// Trap unhandled errors
trapUnhandledNodeErrors();

// Graceful shutdown
async function onShutdown(signal?: NodeJS.Signals) {
  await nitroApp.hooks.callHook("close");
}

parentPort.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort.postMessage({ event: "exit" });
  }
});
