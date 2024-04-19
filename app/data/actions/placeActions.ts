'use server'

import { CreatePlaceFormSchema, UpdateCoordsFormSchema, UpdatePlaceFormSchema } from "./validationForms";
import { insertPlace, updatePlaceInDb, deletePlaceFromDB, NewPlace, UpdatePlace, updatePlaceCoordinatesDb, NewPlaceWithoutFormData, UpdatePlaceWithoutFormData } from "../places";
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
        name?: string[];
        validatedEmoji?: string[];
    };
    message?: string | null;
};

export async function createPlace(placeProps: NewPlaceWithoutFormData, viewState: string, prevState: State, formData: FormData) {

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

    const newPlace: NewPlace = {
        name: validatedFields.data.name,
        description: validatedFields.data.name,
        category: validatedFields.data.category,
        emoji: validatedFields.data.validated_emoji,
        lat: validatedFields.data.validated_lat.toString(),
        lng: validatedFields.data.validated_lng.toString(),
        map_id: validatedFields.data.validated_map_id,
    }

    let place_id;
    try {
        place_id = await insertPlace(newPlace);
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to create place." }
    }
    revalidatePath(`/maps/${placeProps.map_id}`);
    redirect(`/maps/${placeProps.map_id}?viewstate=${viewState}&place=${place_id}`);
}

export async function updatePlace(placeProps: UpdatePlaceWithoutFormData, viewstate: string, prevState: State, formData: FormData) {

    const validatedFields = UpdatePlaceFormSchema.safeParse({
        validated_id: placeProps.id,
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: placeProps.emoji,
        category: formData.get('category'),
        validated_map_id: placeProps.map_id,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const updates: Omit<UpdatePlace, 'map_id'> = {
        id: validatedFields.data.validated_id,
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        emoji: validatedFields.data.validated_emoji,
        category: validatedFields.data.category,
    }

    try {
        await updatePlaceInDb(updates)
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place." }
    }

    revalidatePath(`/maps/${validatedFields.data.validated_map_id}`);
    redirect(`/maps/${validatedFields.data.validated_map_id}?viewstate=${viewstate}&place=${validatedFields.data.validated_id}`);
}

export async function updatePlaceCoordinates(lat: number, lng: number, id: number, map_id: number, viewstate: string) {

    const validatedFields = UpdateCoordsFormSchema.safeParse({
        validated_id: id,
        validated_lat: lat,
        validated_lng: lng,
        validated_map_id: map_id
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Something went wrong.',
        };
    }

    const { validated_lat, validated_lng, validated_id, validated_map_id } = validatedFields.data;

    try {
        await updatePlaceCoordinatesDb(validated_lat, validated_lng, validated_id)
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place coordinates." }
    }
    revalidatePath(`/maps/${validated_map_id}`);
    redirect(`/maps/${validated_map_id}?viewstate=${viewstate}&place=${validated_id}`);
}

export async function deletePlace(place_id: number, map_id: number, searchParams: URLSearchParams) {

    try {
        deletePlaceFromDB(place_id);
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place coordinates." }
    }

    revalidatePath(`/maps/${map_id}`)
    redirect(`/maps/${map_id}?${searchParams.toString()}`)
}