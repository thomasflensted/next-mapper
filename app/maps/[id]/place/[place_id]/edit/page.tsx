import { fetchMapDetails, fetchPlace } from "@/app/lib/data"
import EditPlaceForm from "@/app/ui/forms/place/EditPlaceForm";
import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation"

export default async function Page({ params, searchParams }: { params: { place_id: string, id: string }, searchParams: { viewstate: string } }) {

    const place = await fetchPlace(+params.place_id)
    const map = await fetchMapDetails(+params.id);
    if (!map || !place) notFound();

    let backUrl = new URLSearchParams(searchParams);

    return (
        <div className="flex flex-col w-2/5 p-8 border mx-auto rounded-lg h-min shadow-lg relative">
            <h2 className="text-lg font-bold text-blue-600 mb-3">Edit Place</h2>
            <Link href={`/maps/${params.id}?${backUrl.toString()}`} scroll={false}>
                <Cross2Icon className="absolute top-4 right-4 text-gray-500" />
            </Link>
            <EditPlaceForm place={place} backUrl={backUrl.toString()} />
        </div>
    )
}