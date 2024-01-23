declare module '#app' {
  import type {Socket} from "socket.io-client";

  interface NuxtApp {
    $io(): Socket
  }
}

declare module 'vue' {
  import type {Socket} from "socket.io-client";

  interface ComponentCustomProperties {
    $io(): Socket
  }
}

declare module "#internal/nitro/utils" {
  export * from "nitropack/dist/runtime/utils"
}

declare module "#internal/nitro/shutdown" {
  export * from "nitropack/dist/runtime/shutdown"
}
