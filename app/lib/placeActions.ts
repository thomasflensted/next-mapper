'use server'
import { CreatePlaceFormSchema } from "./validationForms";

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

type createProps = {
    emoji: string,
    lat: number,
    lng: number,
    map_id: number,
    viewState: string
}

export async function createPlace(placeProps: createProps, prevState: State, formData: FormData) {

    const validatedFields = CreatePlaceFormSchema.safeParse({
        name: formData.get('placename'),
        description: formData.get('placedescription'),
        validated_emoji: placeProps.emoji,
        category: formData.get('placecategory'),
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