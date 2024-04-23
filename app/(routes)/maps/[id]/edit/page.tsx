import Link from "next/link"
import EditMapForm from "@/app/ui/forms/map/EditMapForm"
import { Cross2Icon } from "@radix-ui/react-icons"
import { notFound } from "next/navigation";
import DeleteMapButton from "@/app/ui/map/DeleteMapButton";
import { MapDetailsType, selectMapDetails } from "@/app/data/maps";

export default async function Page({ params }: { params: { id: string } }) {

    const mapDetails: MapDetailsType = await selectMapDetails(+params.id);
    if (!mapDetails) notFound();

    return (
        <div className="relative flex flex-col w-11/12 p-8 mx-auto mt-8 border rounded-lg shadow-lg md:w-2/4 lg:w-2/6 md:mt-0">
            <Link href={'/maps/' + params.id}>
                <Cross2Icon className="absolute text-gray-500 top-4 right-4" />
            </Link>
            <h2 className="mb-3 text-lg font-bold text-blue-600">Edit Map Details</h2>
            <EditMapForm defaultName={mapDetails.name} defaultDesc={mapDetails.description} defaultEmoji={mapDetails.emoji} />
            <DeleteMapButton />
        </div>
    )
}