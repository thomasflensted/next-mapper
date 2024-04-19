'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';
import { CreateMapFormSchema, UpdateMapFormSchema } from "./validationForms"
import { deleteMapFromDB, insertMap, updateMapInDb, NewMap, UpdateMap } from "../maps";

export type State = {
    errors?: {
        name?: string[];
        validatedEmoji?: string[];
    };
    message?: string | null;
};

export async function deleteMap(id: number) {

    try {
        await deleteMapFromDB(id);
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

    const newMap: NewMap = {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        emoji: validatedFields.data.validated_emoji,
        user_id: validatedFields.data.validated_user_id
    };

    try {
        await insertMap(newMap)
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to create map." }
    }

    revalidatePath('/maps/')
    redirect('/maps/')
}

export async function updateMap(map_id: number, emoji: string, sp: string, prevState: State, formData: FormData) {

    const validatedFields = UpdateMapFormSchema.safeParse({
        id: map_id,
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: emoji
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const updates: UpdateMap = {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        emoji: validatedFields.data.validated_emoji
    };

    try {
        await updateMapInDb(updates, map_id);
    } catch (error) {
        return { message: "Database error: Failed to upate map." }
    }

    revalidatePath('/maps/')
    revalidatePath('/maps/' + map_id)
    revalidatePath('/maps/' + map_id + '/edit')
    redirect('/maps/' + map_id + `?${sp}`);
}