import MapComponent from './MapComponent';
import { Place, selectPlaces } from '@/app/data/places';

type MapContainerProps = {
    map_id: string
}

export async function MapContainer({ map_id }: MapContainerProps) {

    const places: Place[] = await selectPlaces(+map_id)

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative mx-auto cursor-pointer">
            <MapComponent places={places}>
            </MapComponent>
        </div>
    )
}
export default MapContainer;