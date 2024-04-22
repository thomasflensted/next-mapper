import { z } from 'zod';

// MAPS

export const MapFormSchema = z.object({
    id: z.number({ invalid_type_error: "Map id must be of type number." }),
    name: z.string({ required_error: "Name is required" }).min(1, { message: "Name must be filled out." }),
    description: z.string({ invalid_type_error: "Description is of invalid type" }),
    validated_emoji: z.string({ invalid_type_error: "Emoji is of invalid type." }).emoji({ message: "Emoji is invalid." }),
    validated_user_id: z.string({ invalid_type_error: 'User id must be of type number.', required_error: 'User id is required.' }),
})

export const CreateMapFormSchema = MapFormSchema.omit({ id: true, created_at: true, updated_at: true })
export const UpdateMapFormSchema = MapFormSchema.omit({ id: true, created_at: true, updated_at: true, validated_user_id: true });

// PLACES

export const PlaceFormSchema = z.object({
    validated_id: z.number({ invalid_type_error: 'Id must be of type number', required_error: 'Id is required' }),
    name: z.string({ required_error: "Name is required.", invalid_type_error: 'Name must of type string' }).min(1, { message: "Name must be filled out." }),
    description: z.string({ invalid_type_error: "Desscription msut be of type string." }),
    validated_emoji: z.string({ invalid_type_error: "Emoji must be of type string", required_error: "Emoji is required." }).emoji({ message: "Invalid emoji" }),
    category: z.enum(['restaurant', 'cafe', 'accommodation', 'sight', 'nature', 'museum', 'memory', 'other']),
    validated_lat: z.coerce.number({ invalid_type_error: "Lat must me a number.", required_error: "Lat is required" }).gt(-91, { message: 'Invalid GPS coordinates.' }).lt(91, { message: 'Invalid GPS coordinates.' }),
    validated_lng: z.coerce.number({ invalid_type_error: "Lng must me a number.", required_error: "Lng is required" }).gt(-181, { message: 'Invalid GPS coordinates.' }).lt(181, { message: 'Invalid GPS coordinates.' }),
    validated_map_id: z.number({ invalid_type_error: 'Map id must be a number', required_error: 'Map id is required' })
})

export const CreatePlaceFormSchema = PlaceFormSchema.omit({ validated_id: true })
export const UpdatePlaceFormSchema = PlaceFormSchema.omit({ validated_lat: true, validated_lng: true })
export const UpdateCoordsFormSchema = PlaceFormSchema.omit({ name: true, description: true, validated_emoji: true, category: true });