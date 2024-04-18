import { fetchFilteredPlaces } from '@/app/lib/data/placeData';
import MapComponent from './MapComponent';

type MapContainerProps = {
    map_id: string,
    view: string,
    currentPlace: string
}

export async function MapContainer({ map_id }: MapContainerProps) {

    const filter = null;
    const places = await fetchFilteredPlaces(filter, +map_id)

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative mx-auto cursor-pointer">
            <MapComponent places={places}>
            </MapComponent>
        </div>
    )
}
export default MapContainer;