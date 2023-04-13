// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "pathe";

export default defineNuxtConfig({
  srcDir: "src",
  modules: ["@nuxtjs/tailwindcss"],
  typescript: {
    strict: true,
  },
  app: {
    head: {
      script: [
        {
          src: "/preline/dist/preline.js",
          body: true,
          defer: true,
        },
      ],
    },
  },

  alias: {
    "#internal/nitro": resolve(
      __dirname,
      "src/server/nitro-socket/dist/runtime"
    ),
  },

  nitro: {
    preset: resolve(__dirname, "src/server/presets/node-socket.ts"),
  },
});
