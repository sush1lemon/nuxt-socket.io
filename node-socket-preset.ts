import { defineNitroPreset } from "nitropack";
import { resolve } from "pathe";

export default defineNitroPreset({
    entry: "#internal/nitro/entries/node-socket",
    serveStatic: true,
    commands: {
        preview: "node ./server/index.mjs",
    },
});
