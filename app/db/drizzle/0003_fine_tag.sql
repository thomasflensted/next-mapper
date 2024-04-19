ALTER TABLE "maps" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "maps" ALTER COLUMN "updated_at" SET DEFAULT now();