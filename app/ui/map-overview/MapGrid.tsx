import { fetchMaps } from "@/app/lib/data";
import Link from "next/link";
import MapCard from "./MapCard";
import CreateNewMapCard from "./CreateNewMapCard";

export async function MapGrid() {

    const maps = await fetchMaps('2be0f326-4cc4-4c36-a87e-39b4c8d778d0');

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