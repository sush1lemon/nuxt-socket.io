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
          src: "/preline/preline-dist/preline.js",
          body: true,
          defer: true,
        },
      ],
    },
  },
  alias: {
    "#internal/nitro": resolve(
      __dirname,
      "src/nitro-socket/nitro-dist/runtime"
    ),
  },
  nitro: {
    preset: resolve(__dirname, "node-socket.ts"),
  },
});
