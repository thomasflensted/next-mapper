/*import { sql } from "@vercel/postgres";
import { Map } from "../definitions";
import { unstable_noStore } from "next/cache";

export async function fetchMaps(user_id: number) {
    unstable_noStore()
    try {
        const data = await sql<Map>`
        SELECT * FROM maps 
        WHERE user_id = ${user_id} 
        ORDER BY created_at DESC`;
        return data.rows;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchMapCount(user_id: number) {
    try {
        const data = await sql`
        SELECT COUNT(*) FROM maps 
        WHERE user_id = ${user_id}`;
        return data.rows[0].count;
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}

export async function fetchMapDetails(id: number) {
    type MapDetails = Omit<Map, 'id' | 'user_id'>;
    try {
        const data = await sql<MapDetails>`
        SELECT name, description, emoji FROM maps 
        WHERE id = ${id}`;
        return data.rows[0];
    } catch (error) {
        console.log('Database Error:', error);
        throw new Error('Failed to fetch maps.');
    }
}
*/