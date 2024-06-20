import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { groups } from "./schemas/groups";
import { organisations } from "./schemas/organisations";
import { profiles } from "./schemas/profiles";
import { todos } from "./schemas/todos";

const client = postgres(process.env.DB_CONNECTION_STRING!, { prepare: false });
const db = drizzle(client, {
  schema: { organisations, profiles, groups, todos },
});

export default db;
