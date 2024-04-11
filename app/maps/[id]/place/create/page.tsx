
import CreatePlaceForm from "@/app/ui/forms/CreatePlaceForm"
import { Cross2Icon } from "@radix-ui/react-icons"
import Link from "next/link"

const Page = ({ params }: { params: { id: string } }) => {
    return (
        <div className="flex flex-col w-2/5 p-8 border mx-auto rounded-lg h-min shadow-lg relative">
            <h2 className="text-lg font-bold text-blue-600 mb-3">Create New Place</h2>
            <Link href={'/maps/' + params.id}>
                <Cross2Icon className="absolute top-4 right-4 text-gray-500" />
            </Link>
            <CreatePlaceForm map_id={params.id} />
        </div>
    )
}
export default Page