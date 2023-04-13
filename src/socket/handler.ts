import { Server } from "socket.io";

export const socketHandler = (io: Server) => {
  console.log("✔ Hello from the socket handler");
  io.on("connection", function (socket) {
    socket.on("message", function (msg) {
      console.log("[Socket.io] message received", msg);
      io.emit("message", msg);
    });
    console.log("socket connected", socket.id);
    socket.on("disconnect", function () {
      console.log("socket disconnected", socket.id);
    });
  });
};
