import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { todos } from "./schemas/todos";

const client = postgres(process.env.DB_CONNECTION_STRING!, { prepare: false });
const db = drizzle(client, { schema: { todos } });

export default db;
