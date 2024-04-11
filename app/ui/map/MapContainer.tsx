import { fetchPlaces } from '@/app/lib/data';
import MapComponent from './MapComponent';
import PopUpWithAddNew from '../map-components/PopUpWithAddNew';

export async function MapContainer({ params, searchParams }: { params: any, searchParams: any }) {

    const places = await fetchPlaces('2be0f326-4cc4-4c36-a87e-39b4c8d778d0');

    return (
        <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative mx-auto cursor-pointer">
            <MapComponent>
            </MapComponent>
        </div>
    )
}
export default MapContainer;