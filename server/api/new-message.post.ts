import {Socket} from "socket.io";

export default defineEventHandler(async (event) => {
  const io: Socket = event._socket;
  const { thread, message, from_id, from_name } = await readBody(event);
  if (!thread || !message || !from_id || !from_name) {
      throw createError({
          message: "missing param",
          statusCode: 400,
      });
  }

  io.to(thread).emit("message", {
    from_id,
    from_name,
    content: message,
  })

  console.table( { thread, message, from_id, from_name } )
})
