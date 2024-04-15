'use server'

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';
import { CreateMapFormSchema, MapFormSchema } from "./validationForms"

export type State = {
    errors?: {
        name?: string[];
        validatedEmoji?: string[];
    };
    message?: string | null;
};

export async function deleteMap(id: number) {

    try {
        await sql`DELETE FROM maps WHERE id = ${id}`
    } catch (error) {
        return { message: "Database error: Failed to delete map." }
    }
    revalidatePath('/maps/')
    redirect('/maps/')
}

export async function createMap(user_id: number, emoji: string, prevState: State, formData: FormData) {

    const validatedFields = CreateMapFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: emoji,
        validated_user_id: user_id
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const { name, description, validated_emoji, validated_user_id } = validatedFields.data;

    try {
        await sql`
        INSERT INTO maps 
        (name, description, emoji, user_id) 
        VALUES (${name}, ${description}, ${validated_emoji}, ${validated_user_id})`
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to create map." }
    }
    revalidatePath('/maps/')
    redirect('/maps/')
}

export async function updateMap(map_id: number, user_id: number, emoji: string, prevState: State, formData: FormData) {

    const validatedFields = MapFormSchema.safeParse({
        id: map_id,
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: emoji,
        validated_user_id: user_id
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const { id, name, description, validated_emoji, validated_user_id } = validatedFields.data;

    try {
        await sql`
        UPDATE maps 
        SET name = ${name}, description = ${description}, emoji = ${validated_emoji}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id} AND user_id = ${validated_user_id}`
    } catch (error) {
        return { message: "Database error: Failed to create map." }
    }
    revalidatePath('/maps/')
    revalidatePath('/maps/' + id)
    redirect('/maps/' + id);
}