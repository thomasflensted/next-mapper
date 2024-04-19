import { sql } from "drizzle-orm";
import { serial, text, timestamp, pgTable, integer, boolean, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
});

export const user_details = pgTable("user_details", {
    id: serial("id").primaryKey(),
    first_nme: text("first_name").notNull(),
    last_name: text("last_name"),
    user_id: integer("user_id").references(
        () => users.id, { onDelete: 'cascade' }).notNull()
});

export const maps = pgTable("maps", {
    id: serial("id").primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    emoji: text('emoji').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
    user_id: integer("user_id").references(
        () => users.id, { onDelete: 'cascade' }).notNull()
});

export const places = pgTable("places", {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    emoji: text('emoji').notNull(),
    lat: numeric('lat').notNull(),
    lng: numeric('lng').notNull(),
    category: text('category').notNull(),
    have_been: boolean('have_been').notNull().default(false),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    map_id: integer("map_id").references(
        () => maps.id, { onDelete: 'cascade' }).notNull()
});