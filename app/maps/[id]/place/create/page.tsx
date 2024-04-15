
import CreatePlaceForm from "@/app/ui/forms/CreatePlaceForm"
import { Cross2Icon } from "@radix-ui/react-icons"
import Link from "next/link"

const Page = ({ params, searchParams }: { params: { id: string }, searchParams: { viewstate: string } }) => {

    return (
        <div className="flex flex-col w-2/5 p-8 border mx-auto rounded-lg h-min shadow-lg relative">
            <h2 className="text-lg font-bold text-blue-600 mb-3">Create New Place</h2>
            <Link href={'/maps/' + params.id + '?viewstate=' + searchParams.viewstate}>
                <Cross2Icon className="absolute top-4 right-4 text-gray-500" />
            </Link>
            <CreatePlaceForm />
        </div>
    )
}
export default Page