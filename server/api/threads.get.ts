import { useTurso } from "~/utils/turso";

export default defineEventHandler(async (event) => {
  const client = useTurso();

  const result = await client.execute(
    "select * from threads",
  )

  client.close()
  return {
    data: result.rows,
  }
})
