import { NewPlace, UpdatePlace } from "../places";
import { CreatePlaceFormSchema, UpdatePlaceFormSchema, UpdateCoordsFormSchema } from "./validationForms"

export function validateCreatePlaceArgs(emoji: string, lat: string, lng: string, map_id: number, formData: FormData) {

    const validatedFields = CreatePlaceFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: emoji,
        category: formData.get('category'),
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

    const newPlace: Omit<NewPlace, 'user_id'> = {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        category: validatedFields.data.category,
        emoji: validatedFields.data.validated_emoji,
        lat: validatedFields.data.validated_lat.toString(),
        lng: validatedFields.data.validated_lng.toString(),
        map_id: validatedFields.data.validated_map_id,
    }

    return { newPlace };

}
export function validateUpdatePlaceArgs(id: number, emoji: string, map_id: number, formData: FormData) {

    const validatedFields = UpdatePlaceFormSchema.safeParse({
        validated_id: id,
        name: formData.get('name'),
        description: formData.get('description'),
        validated_emoji: emoji,
        category: formData.get('category'),
        validated_map_id: map_id,
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
    return { updates };
}

export function validateCoords(id: number, lat: number, lng: number, map_id: number) {

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

    const validatedData = {
        id: validatedFields.data.validated_id,
        lat: validatedFields.data.validated_lat,
        lng: validatedFields.data.validated_lng,
    }

    return { validatedData };

}