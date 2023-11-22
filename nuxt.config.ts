// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "pathe";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    TURSO: {
      URL: process.env.TURSO_URL,
      TOKEN: process.env.TURSO_TOKEN,
    }
  },
  hooks: {
    'components:dirs': (dirs) => {
      dirs.unshift({
        path: '~/components/ui',
        // this is required else Nuxt will autoImport `.ts` file
        extensions: ['.vue'],
        // prefix for your components, eg: UiButton
        prefix: 'Ui',
        // prevent adding another prefix component by it's path.
        pathPrefix: false
      })
    }
  },
  plugins: ['~/plugins/socket.client'],
  nitro: {
    entry: process.env.NODE_ENV == 'production' ? undefined : "../preset/entry.dev",
    preset: "./preset",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Nuxt3 + Socket.io + Turso Chat',
      charset: 'utf-8',
    }
  }
})
