import { fetchPlace } from "@/app/lib/data"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { place_id: string } }) {

    const place = await fetchPlace(+params.place_id)
    if (!place) notFound();

    return (
        <div>Edit place</div>
    )
}