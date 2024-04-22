import { Suspense } from "react";
import MapGrid from "../../ui/map-overview/MapGrid";
import MapsSortRow from "../../ui/map-overview/MapsSortRow";
import { MapOverviewHeading } from "../../ui/map-overview/MapOverviewHeading";
import { MapGridSkeleton, MapoverViewHeadingSkeleton } from "../../ui/skeletons/skeletons";

export default async function Page({ searchParams }: { searchParams: { sort: string, order: string } }) {

    const sort = ['name', 'created_at', 'updated_at'].includes(searchParams.sort) ? searchParams.sort : 'created_at';
    const order = searchParams.order ? searchParams.order : 'desc';

    return (
        <div className="flex flex-col items-center w-full gap-6">
            <Suspense fallback={<MapoverViewHeadingSkeleton />}>
                <MapOverviewHeading />
            </Suspense>
            <MapsSortRow />
            <Suspense fallback={<MapGridSkeleton />}>
                <MapGrid sort={sort} order={order} />
            </Suspense>
        </div>
    )
}