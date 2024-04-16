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
            <div className="text-center flex gap-6 flex-col items-center">
                <p className="text-4xl mr-2">{mapDetails.emoji}</p>
                <div className="flex flex-col gap-1.5">
                    <h1 className="font-semibold text-xl text-blue-600">{mapDetails.name}</h1>
                    <p className="text-xs font-medium text-blue-500">{`${placeCount} ${placeCount === 1 ? 'place' : 'places'}`}</p>
                </div>
                {mapDetails.description && <p className="font-light text-blue-500 w-2/5 text-sm leading-6">{mapDetails.description}</p>}
            </div>
            <div className="flex gap-2 justify-center">
                <Link href='/maps/'>
                    <button className="w-auto group bg-white border font-light text-blue-600 rounded text-xs px-4 py-2 flex items-center hover:bg-gray-50">
                        <ArrowLeftIcon className="mr-1 text-xs group-hover:-translate-x-2 transition-all ease-in-out duration-200" />
                        Back To Map Overview
                    </button>
                </Link>
                <Link href={`/maps/${map_id}/edit`}>
                    <button className="bg-white border font-light text-blue-600 rounded text-xs px-4 py-2 hover:bg-gray-50">Edit Map Details</button>
                </Link>
            </div>
        </div>
    )
}
export default MapDetails