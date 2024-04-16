'use server'

import { CreatePlaceFormSchema, UpdateCoordsFormSchema, UpdatePlaceFormSchema } from "./validationForms";
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
        name?: string[];
        validatedEmoji?: string[];
    };
    message?: string | null;
};

type PlaceProps = {
    id: number,
    emoji: string,
    lat: number,
    lng: number,
    map_id: number,
    viewState: string
}

type CreatePlaceProps = Omit<PlaceProps, 'id'>;

export async function createPlace(placeProps: CreatePlaceProps, prevState: State, formData: FormData) {

    const validatedFields = CreatePlaceFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: placeProps.emoji,
        category: formData.get('category'),
        validated_lat: placeProps.lat,
        validated_lng: placeProps.lng,
        validated_map_id: placeProps.map_id
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const { validated_map_id, name, description, validated_emoji, category, validated_lat, validated_lng } = validatedFields.data;

    try {
        await sql`
        INSERT INTO places
        (map_id, name, description, lat, lng, category, emoji)
        VALUES (${validated_map_id}, ${name}, ${description}, ${validated_lat}, ${validated_lng}, ${category}, ${validated_emoji})`
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to create place." }
    }
    revalidatePath(`/maps/${placeProps.map_id}`);
    redirect(`/maps/${placeProps.map_id}?viewstate=${placeProps.viewState}`);
}

type UpdatePlaceProps = Omit<PlaceProps, 'lat' | 'lng'>;

export async function updatePlace(placeProps: UpdatePlaceProps, prevState: State, formData: FormData) {

    const validatedFields = UpdatePlaceFormSchema.safeParse({
        validated_id: placeProps.id,
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: placeProps.emoji,
        category: formData.get('category'),
        validated_map_id: placeProps.map_id
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const { validated_id, validated_map_id, name, description, validated_emoji, category } = validatedFields.data;

    try {
        await sql`
        UPDATE places
        SET name = ${name},
            description = ${description},
            emoji = ${validated_emoji},
            category = ${category},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${validated_id}
        AND map_id = ${validated_map_id}`
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place." }
    }
    revalidatePath(`/maps/${validated_map_id}`);
    redirect(`/maps/${validated_map_id}?viewstate=${placeProps.viewState}&place=${validated_id}`);
}

type UpdateCoordsProps = Omit<PlaceProps, 'emoji'>

export async function updatePlaceCoordinates(placeProps: UpdateCoordsProps) {

    const validatedFields = UpdateCoordsFormSchema.safeParse({
        validated_id: placeProps.id,
        validated_lat: placeProps.lat,
        validated_lng: placeProps.lng,
        validated_map_id: placeProps.map_id
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const { validated_id, validated_lat, validated_lng, validated_map_id } = validatedFields.data;

    try {
        await sql`
        UPDATE places
        SET lat = ${validated_lat},
            lng = ${validated_lng}
        WHERE id = ${validated_id}
        AND map_id = ${validated_map_id}`
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place coordinates." }
    }
    revalidatePath(`/maps/${validated_map_id}`);
    redirect(`/maps/${validated_map_id}?viewstate=${placeProps.viewState}&place=${validated_id}`);
}