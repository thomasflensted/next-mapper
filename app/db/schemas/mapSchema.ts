import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";
import { users } from "./userSchemas";

export const maps = pgTable("map", {
    id: serial("id").primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    emoji: text('emoji').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    user_id: text("user_id").references(
        () => users.id, { onDelete: 'cascade' }).notNull()
});
