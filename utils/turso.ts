import {createClient} from "@libsql/client";

export const useTurso = () => {
  const config = useRuntimeConfig().TURSO;

  if (!config.URL || !config.TOKEN) {
    throw new Error(
      "cannot fetch env variables"
    );
  }
  return createClient({
    url: config.URL,
    authToken: config.TOKEN,
  });
}
