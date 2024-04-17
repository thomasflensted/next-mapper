import { fetchFilteredPlaces } from '@/app/lib/data';
import MapComponent from './MapComponent';

type MapContainerProps = {
    map_id: string,
    filter: string[],
    view: string
    currentPlace: string
}

export async function MapContainer({ map_id, filter }: MapContainerProps) {

    filter = typeof filter === 'string' ? [filter] : filter;
    const places = await fetchFilteredPlaces(filter, +map_id)

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative mx-auto cursor-pointer">
            <MapComponent places={places}>
                {/* {view === 'list' && <MapList places={places} currentPlace={currentPlace} />} */}
            </MapComponent>
        </div>
    )
}
export default MapContainer;