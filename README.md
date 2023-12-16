# Nuxt3 + Socket.io + Turso Chat

### Demo
https://nuxt-socket.onrender.com

### How does this works?
By using a custom nitropack preset and entry files that contains the socket.io server, we can add the socket.io server.
### Related Files

**Nitro Default entry files**

https://github.com/unjs/nitro/blob/main/src/runtime/entries/node-server.ts

https://github.com/unjs/nitro/blob/main/src/runtime/entries/nitro-dev.ts

**Custom Nitropack Preset/Entry**
```
preset/entry.dev.ts
preset/entry.ts // for production build
preset/nitro.config.ts // preset

```
**nitro-socket.ts and nitro-dev.ts changes**
```ts
// preset/entry.ts and preset/entry.dev.ts

import { socketHandler } from "~/socket/handler";
import { Server as SocketServer } from 'socket.io';

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
plugins: ['~/plugins/socket.client'],
nitro: {
    entry: process.env.NODE_ENV == 'production' ? undefined : "../preset/entry.dev",
    preset: "./preset",
},
```

You can use your own socket.io client nuxt plugin, or just copy the related files
