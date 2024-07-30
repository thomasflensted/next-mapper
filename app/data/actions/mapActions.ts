'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';
import { deleteMapFromDB, insertMap, updateMapInDb } from "../maps";
import { validateCreateMapArgs, validateUpdateMapArgs } from "../validation/validateMapData";

export type State = {
    errors?: {
        description?: string[],
        name?: string[],
        validatedEmoji?: string[],
        validated_user_id?: string[],
    };
    message?: string | null;
};

export async function deleteMap(id: number) {

    try {
        await deleteMapFromDB(id);
    } catch (error) {
        console.error(error);
        return { message: "Database error: Failed to delete map." }
    }
    revalidatePath('/maps/')
    redirect('/maps/')
}

export async function createMap(user_id: string, emoji: string, prevState: State, formData: FormData) {

    const res = validateCreateMapArgs(user_id, emoji, formData);
    if (!res.newMap) return res;

    try {
        await insertMap(res.newMap)
    } catch (error) {
        console.error(error);
        return { message: 'Database error: Failed to upate map.', ...res };
    }

    revalidatePath('/maps/')
    redirect('/maps/')
}

export async function updateMap(map_id: number, emoji: string, sp: string, prevState: State, formData: FormData) {

    const res = validateUpdateMapArgs(map_id, emoji, formData);
    if (!res.updates) return res;

    try {
        await updateMapInDb(res.updates, map_id);
    } catch (error) {
        return { message: "Database error: Failed to upate map.", ...res }
    }

    revalidatePath('/maps/')
    redirect('/maps/' + map_id + `?${sp}`);
}