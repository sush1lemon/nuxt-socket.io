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
          src: "/preline/nitro-dist/preline.js",
          body: true,
          defer: true,
        },
      ],
    },
  },

  alias: {
    "#internal/nitro": resolve(
      __dirname,
      "src/server/nitro-socket/nitro-dist/runtime"
    ),
  },

  nitro: {
    preset: resolve(__dirname, "node-socket.ts"),
  },
});
