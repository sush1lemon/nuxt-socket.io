import { defineNitroPreset } from "nitropack";

export default defineNitroPreset({
  entry: "#internal/nitro/entries/node-socket",
  // extends: "internal/nitro-default/entries/node",
  serveStatic: true,
  commands: {
    preview: "node ./server/index.mjs",
  },
});
