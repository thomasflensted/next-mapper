import Link from "next/link"
import { Cross2Icon } from "@radix-ui/react-icons"
import EditMapForm from "@/app/ui/forms/EditMapForm"
import { fetchMapDetails } from "@/app/lib/data"

export default async function Page({ params }: { params: { id: string } }) {

    const mapDetails = await fetchMapDetails(+params.id);

    return (
        <div className="flex flex-col w-2/5 p-8 border mx-auto rounded-lg h-min shadow-lg relative">
            <Link href={'/maps/' + params.id}>
                <Cross2Icon className="absolute top-4 right-4 text-gray-500" />
            </Link>
            <h2 className="text-lg font-bold text-blue-600 mb-3">Edit Map Details</h2>
            <EditMapForm defaultName={mapDetails.name} defaultDesc={mapDetails.description} defaultEmoji={mapDetails.emoji} map_id={params.id} />
        </div>
    )
}