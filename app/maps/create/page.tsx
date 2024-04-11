import Link from "next/link"
import { Cross2Icon } from "@radix-ui/react-icons"
import CreateMapForm from "@/app/ui/forms/CreateMapForm"

const Page = () => {
    return (
        <div className="flex flex-col w-2/5 p-8 border mx-auto rounded-lg h-min shadow-lg relative">
            <h2 className="text-lg font-bold text-blue-600 mb-3">Create New Map</h2>
            <Link href='/maps'>
                <Cross2Icon className="absolute top-4 right-4 text-gray-500" />
            </Link>
            <CreateMapForm />
        </div>
    )
}
export default Page