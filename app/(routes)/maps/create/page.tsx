import Link from "next/link"
import { Cross2Icon } from "@radix-ui/react-icons"
import CreateMapForm from "@/app/ui/forms/map/CreateMapForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation";

async function Page() {

    const session = await auth();
    if (!session) redirect('/')

    return (
        <div className="relative flex flex-col w-2/5 p-8 mx-auto border rounded-lg shadow-lg h-min">
            <h2 className="mb-3 text-lg font-bold text-blue-600">Create New Map</h2>
            <Link href='/maps'>
                <Cross2Icon className="absolute text-gray-500 top-4 right-4" />
            </Link>
            <CreateMapForm user_id={session?.user.id} />
        </div>
    )
}

export default Page