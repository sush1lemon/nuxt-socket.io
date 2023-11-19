export default defineEventHandler(async (event) => {
  const { thread, message, from_id, from_name } = await readBody(event);
  if (!thread || !message || !from_id || !from_name) {
      throw createError({
          message: "missing param",
          statusCode: 400,
      });
  }

  console.log( { thread, message, from_id, from_name } )
})
