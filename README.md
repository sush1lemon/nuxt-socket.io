# Nuxt 3 + Socket.io

A junky a way to use socket.io with nuxt 3 nitro server

### Demo
https://nuxt-socket.onrender.com

### How does this works?
By using a custom build of nitropack that contains the socket.io server, creating custom preset and a custom entry file, we can add the socket.io server.
### Related Files

**Custom Nitropack Build**
```
server/nitro-socket
```
**nitro-socket.ts and nitro-dev.ts changes**
```ts
// src/server/nitro-socket/nitro-dist/runtime/entries/nitro-socket.ts

import { socketHandler } from "~/socket/handler";

// Inside the server.listen callback
const io = new SocketServer(server);
socketHandler(io);
```

**Socket Handler**
```
socket/handler.ts
```

**Nuxt Config Changes**
```ts
alias: {
    "#internal/nitro": resolve(
    __dirname,
    "server/nitro-socket/nitro-dist/runtime"
    ),
},
nitro: {
    entry: "#internal/nitro/entries/node-socket",
},
```

You can use your own socket.io client nuxt plugin, or just copy the related files
