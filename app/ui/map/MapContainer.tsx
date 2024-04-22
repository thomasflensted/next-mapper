import { auth } from '@/auth';
import MapComponent from './MapComponent';
import { Place, selectPlaces } from '@/app/data/places';
import { redirect } from 'next/navigation';

export async function MapContainer({ map_id }: { map_id: string }) {

    const session = await auth();
    if (!session) redirect('/');
    const places: Place[] = await selectPlaces(+map_id)

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative mx-auto cursor-pointer">
            <MapComponent places={places}>
            </MapComponent>
        </div>
    )
}
export default MapContainer;