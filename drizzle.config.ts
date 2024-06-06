import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas/*.ts",
  out: "./src/db/migrations/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING!,
  },
  verbose: true,
  strict: true,
});
