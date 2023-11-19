declare module '#app' {
    import type {Socket} from "socket.io-client";

    interface NuxtApp {
        $io (): Socket
    }
}

declare module 'vue' {
    import type {Socket} from "socket.io-client";

    interface ComponentCustomProperties {
        $io (): Socket
    }
}
