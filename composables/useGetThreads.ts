import {useTurso} from "~/utils/turso";

export default async function () {
  const client = useTurso();
  const threadsQ = await client.execute(
    "select * from threads",
  )
  return threadsQ.rows
}
