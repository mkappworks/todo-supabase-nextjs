import { defineConfig } from "drizzle-kit";

require("dotenv").config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schemas/*.ts",
  out: "./src/db/migrations/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING!,
  },
  verbose: true,
  strict: true,
});
