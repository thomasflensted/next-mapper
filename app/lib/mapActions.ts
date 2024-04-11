'use server'
import { z } from 'zod';

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';

const MapFormSchema = z.object({
    id: z.string(),
    name: z.string({ required_error: "Name must me filled out." }).min(1, { message: "Name must be filled out." }),
    description: z.string().optional(),
    validatedEmoji: z.string({ invalid_type_error: "Invalid emoji." }).emoji(),
    validatedUserId: z.string(),
    created_at: z.string(),
    updated_at: z.string()
})

export type State = {
    errors?: {
        name?: string[];
        validatedEmoji?: string[];
    };
    message?: string | null;
};

export async function deleteMap(id: string) {
    try {
        await sql`DELETE FROM maps WHERE id = ${id}`
    } catch (error) {
        return { message: "Database error: Failed to delete map." }
    }
    revalidatePath('/maps/')
    redirect('/maps/')
}

const CreateMapFormSchema = MapFormSchema.omit({ id: true, created_at: true, updated_at: true })

export async function createMap(user_id: string, emoji: string, prevState: State, formData: FormData) {

    const validatedFields = CreateMapFormSchema.safeParse({
        name: formData.get('mapname'),
        description: formData.get('mapdescription'),
        validatedEmoji: emoji,
        validatedUserId: user_id,
    })

    console.log('here');

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const now = new Date().toISOString();
    const { name, description, validatedEmoji, validatedUserId } = validatedFields.data;
    console.log({ name, description, validatedEmoji, validatedUserId })

    try {
        await sql`
        INSERT INTO maps 
        (name, description, emoji, user_id, updated_at, created_at) 
        VALUES (${name}, ${description}, ${validatedEmoji}, ${validatedUserId}, ${now}, ${now})`
    } catch (error) {
        return { message: "Database error: Failed to create map." }
    }
    revalidatePath('/maps/')
    redirect('/maps/')
}

const UpdateMapFormSchema = MapFormSchema.omit({ created_at: true, updated_at: true })

export async function updateMap(map_id: string, user_id: string, emoji: string, prevState: State, formData: FormData) {

    const validatedFields = UpdateMapFormSchema.safeParse({
        id: map_id,
        name: formData.get('mapname'),
        description: formData.get('mapdescription'),
        validatedEmoji: emoji,
        validatedUserId: user_id,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const now = new Date().toISOString();
    const { id, name, description, validatedEmoji, validatedUserId } = validatedFields.data;

    try {
        await sql`
        UPDATE maps 
        SET name = ${name}, description = ${description}, emoji = ${validatedEmoji}, updated_at = ${now}
        WHERE id = ${id} AND user_id = ${validatedUserId}`
    } catch (error) {
        return { message: "Database error: Failed to create map." }
    }
    revalidatePath('/maps/')
    redirect('/maps/')
}