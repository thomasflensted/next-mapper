import { places } from "../db/schema";
import { db } from "../db/db";
import { eq, count } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

// TYPES
export type Place = typeof places.$inferSelect;
export type NewPlace = typeof places.$inferInsert;
export type UpdatePlace = { id: number, name: string, description: string, emoji: string, category: string, map_id: number };
export type NewPlaceWithoutFormData = Omit<NewPlace, 'name' | 'description' | 'category'>;
export type UpdatePlaceWithoutFormData = Omit<UpdatePlace, 'name' | 'description' | 'category'>;
export type PlaceDetails = { name: string, description: string, emoji: string, category: string };

// INSERT PLACE
export async function insertPlace(newPlace: NewPlace): Promise<number> {
    try {
        const place = await db.insert(places).values(newPlace).returning();
        return place[0].id;
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to create map.');
    }
}

// GET ALL PLACES ON MAP
export async function selectPlaces(map_id: number): Promise<Place[]> {
    unstable_noStore();
    try {
        return await db.select().from(places).where(eq(places.map_id, map_id))
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to get places.');
    }
}

// GET SINGLE PLACE
export async function selectPlace(id: number): Promise<Place> {
    try {
        const result = await db.select().from(places).where(eq(places.id, id))
        return result[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed get map details.');
    }
}

// UPDATE PLACE
export async function updatePlaceInDb(updates: Omit<UpdatePlace, 'map_id'>): Promise<void> {
    try {
        await db.update(places)
            .set({
                name: updates.name,
                description: updates.description,
                emoji: updates.emoji,
                category: updates.category,
                updated_at: new Date(),
            })
            .where(eq(places.id, updates.id));
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to update map.');
    }
}

// UPDATE PLACE
export async function updatePlaceCoordinatesDb(lat: number, lng: number, id: number): Promise<void> {
    try {
        await db.update(places)
            .set({
                lat: lat.toString(),
                lng: lng.toString(),
                updated_at: new Date(),
            })
            .where(eq(places.id, id));
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to update map.');
    }
}

// DELETE PLACE
export async function deletePlaceFromDB(id: number): Promise<void> {
    try {
        await db.delete(places).where(eq(places.id, id));
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to delete map.');
    }
}

export async function selectPlaceCount(map_id: number): Promise<number> {
    try {
        const res = await db.select({ count: count() }).from(places).where(eq(places.map_id, map_id));
        return res[0].count;
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to get map count.');
    }
}