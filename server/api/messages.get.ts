import {useTurso} from "~/utils/turso";

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { thread, page } = query;
  if (!thread) {
    throw createError({
      message: "need thread param",
      statusCode: 400,
    })
  }

  const client = useTurso()
  const tQuery = await client.execute({
    sql: "select * from threads where id = ?",
    args: [<string>thread]
  })

  if (tQuery.rows.length === 0) {
    throw createError({
      message: "cannot find thread",
      statusCode: 404,
    })
  }
  const limit = 10;
  const currentPage = <string>page ?? 1;
  const offset = (parseInt(currentPage) - 1) * limit
  const messages = await client.execute({
    sql: "select * from thread_messages WHERE thread_id = ? order by id desc limit ? offset ?",
    args: [<string>thread, limit, offset]
  })

  return {
    messages: messages.rows
  }
  // console.log(client)
})
