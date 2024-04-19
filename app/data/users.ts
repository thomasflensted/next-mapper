import { users } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

type NewUser = typeof users.$inferInsert;
export async function insertUser(user: NewUser) {
    try {
        const newUser = await db.insert(users).values(user).returning()
        return newUser
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to fetch insert user.');
    }
}

export async function getUser(id: number) {
    try {
        const user = await db.select().from(users).where(eq(users.id, id))
        return user;
    } catch (error) {
        console.log('Database Error:', error);
        throw Error('Failed to fetch maps.');
    }
}