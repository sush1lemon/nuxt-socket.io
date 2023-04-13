import { io } from "socket.io-client";

//Socket Client
const socket = io();
export default defineNuxtPlugin(() => {
  return {
    provide: {
      io: socket,
    },
  };
});
