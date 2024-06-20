import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { organisations } from "./organisations";
import { profiles } from "./profiles";
import { todos } from "./todos";

export const groups = pgTable("groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  organisationId: uuid("organisation_id")
    .references(() => organisations.id, { onDelete: "cascade" })
    .notNull(),
  groupOwnerId: uuid("group_owner_id")
    .references(() => profiles.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const groupsRelations = relations(groups, ({ many, one }) => ({
  organisation: one(organisations, {
    fields: [groups.organisationId],
    references: [organisations.id],
  }),
  groupOwner: one(profiles, {
    fields: [groups.groupOwnerId],
    references: [profiles.id],
  }),
  profile: many(profiles),
  todos: many(todos),
}));
