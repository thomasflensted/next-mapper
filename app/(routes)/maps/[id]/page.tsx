import ControllerRow from "@/app/ui/map-controllers/ControllerRow";
import MapContainer from "@/app/ui/map/MapContainer";
import MapDetails from "@/app/ui/map/MapDetails";
import { MapDetailsSkeleton, MapSkeleton } from "@/app/ui/skeletons/skeletons";
import { Suspense } from "react";
import { URLSearchParams } from "url";

export default async function Page({ params, searchParams }: { params: { id: string }, searchParams: URLSearchParams }) {

    const id = params.id;
    const sp: URLSearchParams = new URLSearchParams(searchParams);

    return (
        <div className="flex flex-col mt-6 mb-20 text-center">
            <Suspense fallback={<MapDetailsSkeleton />}>
                <MapDetails map_id={+id} sp={sp} />
            </Suspense>
            <ControllerRow />
            <Suspense fallback={<MapSkeleton />}>
                <MapContainer map_id={id} />
            </Suspense>
        </div>
    )
}