import { fetchMaps } from "@/app/lib/data";
import Link from "next/link";
import MapCard from "./MapCard";
import CreateNewMapCard from "./CreateNewMapCard";

export async function MapGrid({ sort, order }: { sort: string, order: string }) {

    const maps = await fetchMaps('2be0f326-4cc4-4c36-a87e-39b4c8d778d0');

    if (sort === 'name') {
        if (order === 'desc') maps.sort((a, b) => a['name'].localeCompare(b['name']));
        else maps.sort((a, b) => b['name'].localeCompare(a['name']));
    } else {
        if (order === 'desc') maps.sort((a, b) => b[sort] - a[sort]);
        else maps.sort((a, b) => a[sort] - b[sort]);
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