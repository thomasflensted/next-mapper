import Link from "next/link"
import EditMapForm from "@/app/ui/forms/map/EditMapForm"
import { Cross2Icon } from "@radix-ui/react-icons"
import { notFound } from "next/navigation";
import { fetchMapDetails } from "@/app/lib/data/mapData";
import DeleteMapButton from "@/app/ui/map/DeleteMapButton";

export default async function Page({ params }: { params: { id: string } }) {

    const mapDetails = await fetchMapDetails(+params.id);
    if (!mapDetails) notFound();

    return (
        <div className="relative flex flex-col w-2/5 p-8 mx-auto border rounded-lg shadow-lg h-min">
            <Link href={'/maps/' + params.id}>
                <Cross2Icon className="absolute text-gray-500 top-4 right-4" />
            </Link>
            <h2 className="mb-3 text-lg font-bold text-blue-600">Edit Map Details</h2>
            <EditMapForm defaultName={mapDetails.name} defaultDesc={mapDetails.description} defaultEmoji={mapDetails.emoji} />
            <DeleteMapButton />
        </div>
    )
}