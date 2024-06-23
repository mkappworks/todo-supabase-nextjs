ALTER TABLE "organisations" ADD COLUMN "organisation_owner_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organisations" ADD CONSTRAINT "organisations_organisation_owner_id_profiles_id_fk" FOREIGN KEY ("organisation_owner_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
