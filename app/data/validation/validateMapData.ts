import { NewMap, UpdateMap } from "../maps";
import { CreateMapFormSchema, UpdateMapFormSchema } from "./validationForms";

export function validateCreateMapArgs(user_id: string, emoji: string, formData: FormData) {

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
        }
    }

    const newMap: NewMap = {
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        emoji: validatedFields.data.validated_emoji,
        user_id: validatedFields.data.validated_user_id
    }

    return { newMap }
}

export function validateUpdateMapArgs(map_id: number, emoji: string, formData: FormData) {

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

    return { updates }
}
