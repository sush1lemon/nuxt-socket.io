# Nuxt 3 + Socket.io

A junky a way to use socket.io with nuxt 3 nitro server

### How does this works?
By using a custom build of nitropack and changing the default **"#internal/nitro"**

By creating custom preset and a custom entry file, we can add the socket.io server.

### Related Files

**Nitro Preset**
```
src/server/presets/node-socket.ts
```

**Custom Nitropack Build**
```
src/server/nitro-socket
```
**nitro-socket.ts changes**
```ts
// src/server/nitro-socket/dist/runtime/entries/nitro-socket.ts

import { socketHandler } from "../../../../../socket/handler";

// Inside the server.listen callback
const io = new SocketServer(server);
socketHandler(io);
```

**Socket Handler**
```
src/socket/handler.ts
```

**Nuxt Config Changes**
```ts
nitro: {
  preset: resolve(__dirname, "src/server/presets/node-socket.ts"),
},
alias: {
  "#internal/nitro": resolve(
    __dirname,
    "src/server/nitro-socket/dist/runtime"
  ),
},
```

You can use your own socket.io client nuxt plugin, or just copy the relate files