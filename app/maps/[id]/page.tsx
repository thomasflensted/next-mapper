import ControllerRow from "@/app/ui/map-controllers/ControllerRow";
import DeleteMapButton from "@/app/ui/map/DeleteMapButton";
import MapContainer from "@/app/ui/map/MapContainer";
import MapDetails from "@/app/ui/map/MapDetails";
import { MapSkeleton } from "@/app/ui/skeletons/skeletons";
import { Suspense } from "react";

type PageProps = {
    params: { id: string },
    searchParams: { filter: string[], view: string, place: string }
}

export default async function Page({ params, searchParams }: PageProps) {

    const id = params.id;
    const filter = searchParams.filter ? searchParams.filter : [];
    const view = !searchParams.view || !['marker', 'list'].includes(searchParams.view) ? 'marker' : searchParams.view;
    const currentPlace = searchParams.place;

    return (
        <div className="flex flex-col my-6 text-center">
            <MapDetails map_id={+id} />
            <ControllerRow />
            <Suspense fallback={<MapSkeleton />}>
                <MapContainer map_id={id} filter={filter} view={view} currentPlace={currentPlace} />
            </Suspense>
            <DeleteMapButton />
        </div>
    )
}