import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const maps = pgTable('maps', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    emoji: text('emoji').notNull(),
    created_at: timestamp('timestamp', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('timestamp', { withTimezone: true }).defaultNow()
});