import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { organisations } from "./organisations";
import { profiles } from "./profiles";

export const profilesToOrganisations = pgTable(
  "profiles_to_organisations",
  {
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id),
    organisationId: uuid(" organisation_id")
      .notNull()
      .references(() => organisations.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.profileId, t.organisationId] }),
  }),
);

export const profilesToOrganisationsRelations = relations(
  profilesToOrganisations,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [profilesToOrganisations.profileId],
      references: [profiles.id],
    }),
    organisation: one(organisations, {
      fields: [profilesToOrganisations.organisationId],
      references: [organisations.id],
    }),
  }),
);
