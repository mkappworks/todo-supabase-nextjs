// import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("user_id").notNull(),
//   title: text("title").notNull(),
//   description: text("description"),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });

// export type Todos = typeof todos.$inferSelect;
