import CreatePlaceForm from "@/app/ui/forms/place/CreatePlaceForm"
import { auth } from "@/auth"
import { Cross2Icon } from "@radix-ui/react-icons"
import Link from "next/link"
import { redirect } from "next/navigation";

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: { viewstate: string } }) {

    const session = await auth();
    if (!session || !session.user) redirect('/');

    return (
        <div className="relative flex flex-col w-11/12 p-8 mx-auto mt-8 border rounded-lg shadow-lg md:w-2/4 lg:w-2/6 md:mt-0">
            <h2 className="mb-3 text-lg font-bold text-blue-600">Create New Place</h2>
            <Link href={'/maps/' + params.id + '?viewstate=' + searchParams.viewstate}>
                <Cross2Icon className="absolute text-gray-500 top-4 right-4" />
            </Link>
            <CreatePlaceForm />
        </div>
    )
}