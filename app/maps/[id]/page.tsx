import { fetchFilteredPlaces, fetchMapDetails } from "@/app/lib/data";
import DeleteMapButton from "@/app/ui/map/DeleteMapButton";
import MapContainer from "@/app/ui/map/MapContainer";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
    params: { id: string },
    searchParams: { filter: string[], view: string }
}

export default async function Page({ params, searchParams }: PageProps) {

    const filter = searchParams?.filter || null;
    const view = searchParams?.view || 'marker';
    const id = params.id;
    const mapDetails = await fetchMapDetails(id);
    const places = await fetchFilteredPlaces(filter, id);

    if (!mapDetails) notFound();

    return (
        <div className="flex flex-col gap-8 my-10 text-center">
            <div className="text-center flex flex-col gap-4 items-center">
                <h1 className="font-semibold text-xl text-blue-600">{mapDetails.name}</h1>
                <p className="mt-2 font-light text-blue-500 w-2/5 text-sm leading-6">{mapDetails.description}</p>
            </div>
            <div className="flex gap-2 justify-center">
                <Link href='/maps/'>
                    <button className="w-auto group bg-white border font-light text-blue-600 rounded text-xs px-4 py-2 flex items-center hover:bg-gray-50">
                        <ArrowLeftIcon className="mr-1 text-xs group-hover:-translate-x-2 transition-all ease-in-out duration-200" />
                        Back To Map Overview
                    </button>
                </Link>
                <Link href={`/maps/${id}/edit`}>
                    <button className="bg-white border font-light text-blue-600 rounded text-xs px-4 py-2 hover:bg-gray-50">Edit Map Details</button>
                </Link>
            </div>
            <MapContainer params={params} searchParams={searchParams} />
            <DeleteMapButton id={id} />
        </div>
    )
}