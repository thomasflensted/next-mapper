'use server'
import { z } from 'zod';

import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';

const PlaceFormSchema = z.object({
    id: z.string(),
    name: z.string({ required_error: "Name must me filled out." }).min(1, { message: "Name must be filled out." }),
    description: z.string().optional(),
    validatedEmoji: z.string({ invalid_type_error: "Invalid emoji." }).emoji(),
    validatedUserId: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    type: z.string(),
})