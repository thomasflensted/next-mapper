import { serial, text, timestamp, pgTable, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { maps } from "./mapSchema";
import { users } from "./userSchemas"

export const places = pgTable("place", {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    emoji: text('emoji').notNull(),
    lat: numeric('lat').notNull(),
    lng: numeric('lng').notNull(),
    category: text('category').notNull(),
    have_been: boolean('have_been').notNull().default(false),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    map_id: integer("map_id").references(
        () => maps.id, { onDelete: 'cascade' }).notNull(),
    user_id: text("user_id").references(
        () => users.id, { onDelete: 'cascade' }).notNull()
});