ALTER TABLE "places" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "places" ALTER COLUMN "updated_at" SET DEFAULT now();