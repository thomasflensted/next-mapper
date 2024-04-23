'use server'

import { insertPlace, updatePlaceInDb, deletePlaceFromDB, updatePlaceCoordinatesDb, NewPlaceWithoutFormData, UpdatePlaceWithoutFormData } from "../places";
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';
import { validateCoords, validateCreatePlaceArgs, validateUpdatePlaceArgs } from "../validation/validatePlaceData";


export type State = {
    errors?: {
        name?: string[];
        validatedEmoji?: string[];
    };
    message?: string | null;
};

export async function createPlace(placeProps: NewPlaceWithoutFormData, viewState: string, prevState: State, formData: FormData) {

    const res = validateCreatePlaceArgs(placeProps.emoji, placeProps.lat, placeProps.lng, placeProps.map_id, formData);
    if (!res.newPlace) return res;

    let place_id;
    try {
        place_id = await insertPlace(res.newPlace);
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to create place.", ...res }
    }

    revalidatePath(`/maps/${placeProps.map_id}`);
    redirect(`/maps/${placeProps.map_id}?viewstate=${viewState}&place=${place_id}`);
}

export async function updatePlace(placeProps: UpdatePlaceWithoutFormData, viewstate: string, prevState: State, formData: FormData) {

    const res = validateUpdatePlaceArgs(placeProps.id, placeProps.emoji, placeProps.map_id, formData)
    if (!res.updates) return res;

    try {
        await updatePlaceInDb(res.updates)
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place.", ...res }
    }

    revalidatePath(`/maps/${placeProps.map_id}`);
    redirect(`/maps/${placeProps.map_id}?viewstate=${viewstate}&place=${res.updates.id}`);
}

export async function updatePlaceCoordinates(lat: number, lng: number, id: number, map_id: number, sp: URLSearchParams) {

    const res = validateCoords(id, lat, lng, map_id);
    if (!res.validatedData) return res;

    try {
        await updatePlaceCoordinatesDb(res.validatedData.lat, res.validatedData.lng, res.validatedData.id)
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place coordinates.", ...res }
    }

    const returnURL = new URLSearchParams(sp);
    returnURL.delete('lat');
    returnURL.delete('lng');

    revalidatePath(`/maps/${map_id}`);
    redirect(`/maps/${map_id}?${returnURL.toString()}`);
}

export async function deletePlace(place_id: number, map_id: number, searchParams: URLSearchParams) {

    try {
        await deletePlaceFromDB(place_id);
    } catch (error) {
        console.log(error);
        return { message: "Database error: Failed to update place coordinates." }
    }

    revalidatePath(`/maps/${map_id}`)
    redirect(`/maps/${map_id}?${searchParams.toString()}`)
}