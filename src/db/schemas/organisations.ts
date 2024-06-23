import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { groups } from "./groups";
import { profiles } from "./profiles";
import { profilesToOrganisations } from "./profilesToOrganisations";

export const organisations = pgTable("organisations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  organisationOwnerId: uuid("organisation_owner_id")
    .references(() => profiles.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const organisationsRelations = relations(organisations, ({ many }) => ({
  profilesToOrganisations: many(profilesToOrganisations),
  groups: many(groups),
}));
