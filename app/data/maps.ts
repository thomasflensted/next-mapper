import { maps } from "../db/schemas/mapSchema";
import { db } from "../db/db";
import { eq, count } from "drizzle-orm";

// TYPES
export type Map = typeof maps.$inferSelect;
export type NewMap = typeof maps.$inferInsert;
export type UpdateMap = { name: string, description: string, emoji: string };
export type MapDetailsType = { name: string, description: string, emoji: string };

// INSERT MAP
export async function insertMap(newMap: NewMap): Promise<void> {
    try {
        await db.insert(maps).values(newMap);
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to create map.');
    }
}

// GET ALL MAPS BELONGING TO USER
export async function selectUserMaps(user_id: string): Promise<Map[]> {
    try {
        return await db.select().from(maps).where(eq(maps.user_id, user_id))
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to get maps.');
    }
}

// GET DETAILS OF SINGLE MAP
export async function selectMapDetails(id: number): Promise<MapDetailsType> {
    try {
        const result = await db.select({
            name: maps.name,
            description: maps.description,
            emoji: maps.emoji,
        }
        ).from(maps).where(eq(maps.id, id))
        return result[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed get map details.');
    }
}

// UPDATE MAP
export async function updateMapInDb(updates: UpdateMap, id: number): Promise<void> {
    try {
        await db.update(maps)
            .set({
                name: updates.name,
                description: updates.description,
                emoji: updates.emoji,
                updated_at: new Date(),
            })
            .where(eq(maps.id, id));
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to update map.');
    }
}

// DELETE MAP
export async function deleteMapFromDB(id: number): Promise<void> {
    try {
        await db.delete(maps).where(eq(maps.id, id));
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to delete map.');
    }
}

// GET NUMBER OF MAPS
export async function selectMapCount(user_id: string): Promise<number> {
    try {
        const res = await db.select({ count: count() }).from(maps).where(eq(maps.user_id, user_id));
        return res[0].count;
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to get map count.');
    }
}