import {Socket} from "socket.io";
import useGetThreads from "~/composables/useGetThreads";
import {useTurso} from "~/utils/turso";

export default defineEventHandler(async (event) => {
  const io: Socket = event._socket;
  const { thread, message, from_id, from_name } = await readBody(event);
  if (!thread || !message || !from_id || !from_name) {
      throw createError({
          message: "missing param",
          statusCode: 400,
      });
  }

  const threads = await useGetThreads();
  const tFind = threads.find(t => t.id == thread);
  if (tFind) {
    if (tFind.persist) {
      const client = useTurso();
      client.execute({
        sql: "INSERT INTO thread_messages (id, thread_id, content, from_name, from_id,created_at) values (?,?,?,?,?,?)",
        args: [
          null,
          thread,
          message,
          from_name,
          from_id,
          Math.floor((new Date).getTime() / 1000),
        ]
      })
    }
    io.to(thread).emit("message", {
      from_id,
      from_name,
      content: message,
    })
  }

  console.table( { thread, message, from_id, from_name } )
})
