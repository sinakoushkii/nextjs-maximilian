import sql from "better-sqlite3";
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";

const db = new sql("messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

// cache function imported from react doesnt return promise but cach imported from next/cache return promise
// cache (from react) is used for request deduplication but cach (from next/cache) is used for caching the data
// finally I should say that these two functions are used when we are not rquesting external api but we are requesting the data from the database

export const getMessages = nextCache(
  cache(function getMessages() {
    console.log("Fetching messages from db");
    return db.prepare("SELECT * FROM messages").all();
  }),
  ["messages"],
  { tags: ["messagesList"] }
);

// in the above code first dependence ["message"] is used internally in nextCahce function , but the second dependence {tags:["messagesList"]} is used to revalidate the cache data when we are callling revalidateTag("messagesList") in the other file


// export const getMessages=cache(function getMessages() {
//   console.log('Fetching messages from db');
//   return db.prepare('SELECT * FROM messages').all();
// })
