import {createClient} from "@libsql/client";
import crypto from 'crypto';

const client = createClient({
  url: process.env.NUXT_TURSO_URL as string,
  authToken: process.env.NUXT_TURSO_TOKEN as string,
});

const threads = [
  [crypto.randomUUID(), "General", 1],
  [crypto.randomUUID(), "Software Development", 1],
  [crypto.randomUUID(), "Games", 1],
  [crypto.randomUUID(), "Others", 1],
  [crypto.randomUUID(), "!Persist", 0]
];

async function main() {
  await client.batch(
    [
      "drop table threads",
      "drop table thread_messages",
      "create table if not exists threads (id varchar(256) primary key,persist integer not null,name varchar (50) not null)",
      "create table if not exists thread_messages (id integer primary key, thread_id varchar(256) not null, content text,from_name varchar(50) not null,from_id varchar(256) not null, created_at integer not null)"
    ],
  );
  console.log("Migrated db!");

  await client.batch([
    "delete from threads",
    ...threads.map((thread) => ({
      sql: "insert into threads(id, name, persist) values(?, ?, ?)",
      args: thread,
    })),
  ])
  console.log("Seeded db");
}

main().catch(console.log);
