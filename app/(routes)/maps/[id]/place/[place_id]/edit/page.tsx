import { MapDetailsType, selectMapDetails } from "@/app/data/maps";
import { Place, selectPlace } from "@/app/data/places";
import DeletePlaceButton from "@/app/ui/forms/place/DeletePlaceButton";
import EditPlaceForm from "@/app/ui/forms/place/EditPlaceForm";
import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation"
import { URLSearchParams } from "url";

export default async function Page({ params, searchParams }: { params: { place_id: string, id: string }, searchParams: URLSearchParams }) {

    const place: Place = await selectPlace(+params.place_id)
    const map: MapDetailsType = await selectMapDetails(+params.id);
    if (!map || !place) notFound();

    let backUrl = new URLSearchParams(searchParams);

    return (
        <div className="relative flex flex-col w-2/5 p-8 mx-auto border rounded-lg shadow-lg h-min">
            <h2 className="mb-3 text-lg font-bold text-blue-600">Edit Place</h2>
            <Link href={`/maps/${params.id}?${backUrl.toString()}`} scroll={false}>
                <Cross2Icon className="absolute text-gray-500 top-4 right-4" />
            </Link>
            <EditPlaceForm place={place} backUrl={backUrl.toString()} />
            <DeletePlaceButton place={place} />
        </div>
    )
}