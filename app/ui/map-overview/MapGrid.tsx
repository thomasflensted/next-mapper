import Link from "next/link";
import MapCard from "./MapCard";
import CreateNewMapCard from "./CreateNewMapCard";
import { Map } from "@/app/lib/definitions";
import { fetchMaps } from "@/app/lib/data/mapData";

export async function MapGrid({ sort, order }: { sort: string, order: string }) {

    const maps = await fetchMaps(1);

    function sortByDate(a: Map, b: Map) {
        var dateA = new Date(a[sort as keyof Map]).getTime();
        var dateB = new Date(b[sort as keyof Map]).getTime();
        return order === 'desc'
            ? dateA > dateB ? -1 : 1
            : dateA > dateB ? 1 : -1
    }

    if (sort === 'name') {
        if (order === 'desc') maps.sort((a, b) => a['name'].localeCompare(b['name']));
        else maps.sort((a, b) => b['name'].localeCompare(a['name']));
    } else {
        maps.sort(sortByDate);
    }

    return (
        <div className="grid grid-cols-4 gap-6 mt-4">
            {maps.map(map => <MapCard key={map.id} title={map.name} desc={map.description} emoji={map.emoji} id={map.id} />)}
            <Link href="/maps/create">
                <CreateNewMapCard />
            </Link>
        </div>
    )
}

export default MapGrid