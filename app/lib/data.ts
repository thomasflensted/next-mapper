import { sql } from '@vercel/postgres';
import { Map, NUMBER_OF_FILTERS } from './definitions';
import { Place } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUser() {
    return;
}

export async function fetchUserDetails(user_id: number) {
    try {
        const data = await sql`SELECT first_name, last_name FROM user_details WHERE user_id = ${user_id}`
        return data.rows[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch user details.');
    }
}

export async function fetchMaps(user_id: number) {
    try {
        const data = await sql<Map>`SELECT * FROM maps WHERE user_id = ${user_id} ORDER BY created_at DESC`;
        return data.rows;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchMapCount(user_id: number) {
    try {
        const data = await sql`SELECT COUNT(*) FROM maps WHERE user_id = ${user_id}`;
        return data.rows[0].count;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchMapDetails(id: number) {
    type MapDetails = Omit<Map, 'id' | 'user_id'>;
    try {
        const data = await sql<MapDetails>`SELECT name, description, emoji FROM maps WHERE id = ${id}`;
        return data.rows[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchPlaces(map_id: number) {
    try {
        const data = await sql<Place>`SELECT * FROM places WHERE map_id = ${map_id}`;
        return data.rows;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchFilteredPlaces(filterArray: string[], map_id: number) {
    try {
        const data = await sql<Place>`SELECT * FROM places WHERE map_id = ${map_id}`
        return !filterArray || filterArray.length === NUMBER_OF_FILTERS || filterArray.length === 0
            ? data.rows
            : data.rows.filter(place => filterArray.includes(place.category));
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchPlace(id: number) {
    try {
        const data = await sql<Place>`SELECT * FROM places WHERE id = ${id}`
        return data.rows[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch place.');
    }
}

export async function fetchPlaceCount(map_id: number) {
    noStore();
    try {
        const data = await sql`
        SELECT COUNT(*) FROM places WHERE map_id = ${map_id}`
        return parseInt(data.rows[0].count);
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch place count.');
    }
}

export async function computeBoundingBox(map_id: number) {
    try {
        const data = await sql<Place>`SELECT * FROM places WHERE map_id = ${map_id}`;
        const lats = data.rows.map(place => place.lat);
        const lngs = data.rows.map(place => place.lng);
        return [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)];
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}