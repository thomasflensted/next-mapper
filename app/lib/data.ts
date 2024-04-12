import { sql } from '@vercel/postgres';
import { NUMBER_OF_FILTERS } from './definitions';
import { Place } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUser() {
    return;
}

export async function fetchUserDetails(user_id: string) {
    try {
        const data = await sql`SELECT first_name, last_name FROM user_details WHERE user_id = ${user_id}`
        return data.rows[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch user details.');
    }
}

export async function fetchMaps(user_id: string) {
    noStore();
    try {
        const data = await sql`SELECT * FROM maps WHERE user_id = ${user_id} ORDER BY created_at DESC`;
        return data.rows;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchMapCount(user_id: string) {
    noStore();
    try {
        const data = await sql`SELECT COUNT(*) FROM maps WHERE user_id = ${user_id}`;
        return data.rows[0].count;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchMapDetails(id: string) {
    noStore();
    try {
        const data = await sql`SELECT name, description, emoji FROM maps WHERE id = ${id}`;
        return data.rows[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchPlaces(map_id: string) {
    try {
        const data = await sql<Place>`SELECT * FROM places WHERE map_id = ${map_id}`;
        return data.rows;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchFilteredPlaces(filterArray: any, map_id: string) {
    try {
        const data = await sql`SELECT * FROM places WHERE map_id = ${map_id}`
        return !filterArray || filterArray.length === NUMBER_OF_FILTERS
            ? data.rows
            : data.rows.filter(place => filterArray.includes(place.category));
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}