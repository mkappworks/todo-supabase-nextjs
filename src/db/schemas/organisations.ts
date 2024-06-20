import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { groups } from "./groups";
import { profilesToOrganisations } from "./profilesToOrganisations";

export const organisations = pgTable("organisations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const organisationsRelations = relations(organisations, ({ many }) => ({
  profilesToOrganisations: many(profilesToOrganisations),
  groups: many(groups),
}));
