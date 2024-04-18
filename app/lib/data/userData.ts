import { sql } from "@vercel/postgres";

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
