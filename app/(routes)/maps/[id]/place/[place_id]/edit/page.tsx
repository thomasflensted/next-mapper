import { MapDetailsType, selectMapDetails } from "@/app/data/maps";
import { Place, selectPlace } from "@/app/data/places";
import DeletePlaceButton from "@/app/ui/forms/place/DeletePlaceButton";
import EditPlaceForm from "@/app/ui/forms/place/EditPlaceForm";
import { MapFormSkeleton } from "@/app/ui/skeletons/skeletons";
import { Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation"
import { Suspense } from "react";
import { URLSearchParams } from "url";

export default async function Page({ params, searchParams }: { params: { place_id: string, id: string }, searchParams: URLSearchParams }) {

    return (
        <div className="relative flex flex-col w-11/12 p-8 mx-auto mt-8 border rounded-lg shadow-lg md:w-2/4 lg:w-2/6 md:mt-0">
            <Suspense fallback={<MapFormSkeleton type='place' />}>
                <PlaceFormWithDetails placeId={+params.place_id} mapId={+params.id} backUrl={searchParams} />
            </Suspense>
        </div>
    )
}

async function PlaceFormWithDetails({ placeId, mapId, backUrl }: { placeId: number, mapId: number, backUrl: URLSearchParams }) {

    const place: Place = await selectPlace(placeId)
    const map: MapDetailsType = await selectMapDetails(mapId);
    if (!map || !place) notFound();

    return (
        <>
            <h2 className="mb-3 text-lg font-bold text-blue-600">Edit Place Details</h2>
            <Link href={`/maps/${mapId}?${backUrl.toString()}`} scroll={false}>
                <Cross2Icon className="absolute text-gray-500 top-4 right-4" />
            </Link>
            <EditPlaceForm place={place} backUrl={backUrl.toString()} />
            <DeletePlaceButton place={place} />
        </>
    )
}