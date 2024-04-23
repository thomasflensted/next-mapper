import Link from "next/link";
import MapCard from "./MapCard";
import CreateNewMapCard from "./CreateNewMapCard";
import { Map, selectUserMaps } from "@/app/data/maps";
import { sortMaps } from "@/app/lib/helpers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function MapGrid({ sort, order }: { sort: string, order: string }) {

    const session = await auth();
    if (!session) redirect('/')

    const maps: Map[] = await selectUserMaps(session?.user.id);
    const sortedMaps: Map[] = sortMaps(sort, order, maps);

    return (
        <div className="grid grid-cols-2 gap-3 mt-4 md:gap-6 md:grid-cols-4">
            {sortedMaps.map(map => <MapCard key={map.id} title={map.name} desc={map.description} emoji={map.emoji} id={map.id} />)}
            <Link href="/maps/create"><CreateNewMapCard /></Link>
        </div>
    )
}

export default MapGrid