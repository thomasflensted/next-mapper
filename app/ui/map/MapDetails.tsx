import { fetchMapDetails, fetchPlaceCount } from "@/app/lib/data";
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { notFound } from "next/navigation";

async function MapDetails({ map_id }: { map_id: number }) {

    const mapDetails = await fetchMapDetails(map_id);
    const placeCount = await fetchPlaceCount(map_id);
    if (!mapDetails) notFound();

    return (
        <div className="flex flex-col gap-6 mb-10">
            <div className="flex flex-col items-center gap-6 text-center">
                <p className="mr-2 text-4xl">{mapDetails.emoji}</p>
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-xl font-semibold text-blue-600">{mapDetails.name}</h1>
                    <p className="text-xs font-medium text-blue-500">{`${placeCount} ${placeCount === 1 ? 'place' : 'places'}`}</p>
                </div>
                {mapDetails.description && <p className="w-2/5 text-sm font-light leading-6 text-blue-500">{mapDetails.description}</p>}
            </div>
            <div className="flex justify-center gap-2">
                <Link href='/maps/'>
                    <button className="flex items-center w-auto px-4 py-2 text-xs font-light text-blue-600 bg-white border rounded group hover:bg-gray-50">
                        <ArrowLeftIcon className="mr-1 text-xs transition-all duration-200 ease-in-out group-hover:-translate-x-2" />
                        Back To Map Overview
                    </button>
                </Link>
                <Link href={`/maps/${map_id}/edit`}>
                    <button className="px-4 py-2 text-xs font-light text-blue-600 bg-white border rounded hover:bg-gray-50">Edit Map Details</button>
                </Link>
            </div>
        </div>
    )
}
export default MapDetails