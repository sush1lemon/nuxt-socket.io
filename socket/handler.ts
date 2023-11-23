import {Server} from "socket.io";
import {useTurso} from "~/utils/turso";
import crypto from "crypto";

export const socketHandler = async (io: Server) => {
  console.log("✔️ Hello from the socket handler");

  const threads = await getThreads();

  io.on("connection", function (socket) {
    console.log("socket connected", socket.id);
    socket.on("disconnect", function () {
      console.log("socket disconnected", socket.id);
    });

    socket.on('joinRoom', (room, user) => {
      socket.join(room);
      io.to(room).emit("join", {
        from_id: user.id,
        from_name: user.name,
        system: true,
        content: `${user.name ?? user.id} joined the thread`
      })
    });

    socket.on('leaveRoom', (room, user) => {
      socket.leave(room);
      io.to(room).emit("leave", {
        from_id: user.id,
        from_name: user.name,
        system: true,
        content: `${user.name ?? user.id} left the thread`
      })
    })

    socket.on("message", function (room, message) {
      console.log(`[Socket.io] message received room ${room}`,);
      const thread = threads.find(t => t.id == room);
      if (thread) {
        io.to(room).emit("message", message);
        if (thread.persist) {
          const client = useTurso();
          client.execute({
            sql: "INSERT INTO thread_messages (id, thread_id, content, from_name, from_id,created_at) values (?,?,?,?,?,?)",
            args: [
              null,
              room,
              message.content,
              message.from_name,
              message.from_id,
              Math.floor((new Date).getTime() / 1000),
            ]
          })
        }
      }
    });
  });
};

const getThreads = async () => {
  const client = useTurso();
  const threadsQ = await client.execute(
    "select * from threads",
  )
  return threadsQ.rows
}
