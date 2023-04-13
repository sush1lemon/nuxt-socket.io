import { defineNitroPreset } from "nitropack";
import { resolve } from "pathe";

export default defineNitroPreset({
  // entry: "#internal/nitro/entries/node-socket",
  entry: resolve(
    __dirname,
    "src/server/nitro-socket/nitro-dist/runtime/entries/node-socket"
  ),
  // extends: "internal/nitro-default/entries/node",
  serveStatic: true,
  commands: {
    preview: "node ./server/index.mjs",
  },
});
