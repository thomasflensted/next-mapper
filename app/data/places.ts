import { places } from "../db/schemas/placeSchema";
import { db } from "../db/db";
import { eq, count, and } from "drizzle-orm";
import { headers } from "next/headers";
import { getUserIdFromHeader } from "../lib/helpers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// TYPES
export type Place = typeof places.$inferSelect;
export type NewPlace = typeof places.$inferInsert;
export type UpdatePlace = { id: number, name: string, description: string, emoji: string, category: string, map_id: number };
export type NewPlaceWithoutFormData = Omit<NewPlace, 'name' | 'description' | 'category' | 'user_id'>;
export type UpdatePlaceWithoutFormData = Omit<UpdatePlace, 'name' | 'description' | 'category'>;
export type PlaceDetails = { name: string, description: string, emoji: string, category: string };

// INSERT PLACE
export async function insertPlace(newPlace: Omit<NewPlace, 'user_id'>): Promise<number> {

    const session = await auth()
    if (!session || !session.user) return redirect('/')
    const user_id = session.user.id;

    try {
        const place: Place[] = await db.insert(places).values({ ...newPlace, user_id }).returning();
        return place[0].id;
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to create map.');
    }
}

// GET ALL PLACES ON MAP
export async function selectPlaces(map_id: number): Promise<Place[]> {

    const session = await auth()
    if (!session || !session.user) return redirect('/')
    const user_id = session.user.id;

    try {
        return await db.select().from(places).where(and(
            eq(places.map_id, map_id),
            eq(places.user_id, user_id)
        ))
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to get places.');
    }
}

// GET SINGLE PLACE
export async function selectPlace(id: number): Promise<Place> {

    const session = await auth()
    if (!session || !session.user) return redirect('/')
    const user_id = session.user.id;

    try {
        const result = await db.select().from(places).where(and(
            eq(places.id, id),
            eq(places.user_id, user_id)))
        return result[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed get map details.');
    }
}

// UPDATE PLACE
export async function updatePlaceInDb(updates: Omit<UpdatePlace, 'map_id'>): Promise<void> {

    const session = await auth()
    if (!session || !session.user) return redirect('/')
    const user_id = session.user.id;

    try {
        await db.update(places)
            .set({
                name: updates.name,
                description: updates.description,
                emoji: updates.emoji,
                category: updates.category,
                updated_at: new Date(),
            })
            .where(and(eq(places.id, updates.id),
                eq(places.user_id, user_id)));
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to update map.');
    }
}

// UPDATE PLACE
export async function updatePlaceCoordinatesDb(lat: number, lng: number, id: number): Promise<void> {

    const session = await auth()
    if (!session || !session.user) return redirect('/')
    const user_id = session.user.id;

    try {
        await db.update(places)
            .set({
                lat: lat.toString(),
                lng: lng.toString(),
                updated_at: new Date(),
            })
            .where(and(
                eq(places.id, id),
                eq(places.user_id, user_id)));
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to update map.');
    }
}

// DELETE PLACE
export async function deletePlaceFromDB(id: number): Promise<void> {

    const session = await auth()
    if (!session || !session.user) return redirect('/')
    const user_id = session.user.id;

    try {
        await db.delete(places).where(and(
            eq(places.id, id),
            eq(places.user_id, user_id)
        ));
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