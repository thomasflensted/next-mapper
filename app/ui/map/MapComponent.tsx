'use client'
import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useRef, useState } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';
import PopUpWithAddNew from '../map-components/PopUpWithAddNew';
import { Place } from '@/app/lib/definitions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useGetInitialView, isValidPlaceID } from '@/app/scripts/helpers';
import PopUpWithInfo from '../map-components/PopUpWithInfo';

const MapComponent = ({ children, places }: { children?: ReactNode, places: Place[] }) => {


    const mapRef = useRef<MapRef>(null);
    const [clickCoords, setClickCoords] = useState({ lat: 0, lng: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const initialViewState = useGetInitialView();
    const searchParams = useSearchParams()
    const place_id = isValidPlaceID(searchParams.get('place'), places) ? searchParams.get('place') : null;
    const path = usePathname();

    const handleMapClick = (lat: number, lng: number) => {
        const newUrl = new URLSearchParams(searchParams)
        newUrl.delete('place');
        router.replace(`${path}?${newUrl.toString()}`, { scroll: false });
        setClickCoords({ lat, lng })
        if (place_id) { setShowPopup(false) } else { setShowPopup(!showPopup) };
    }

    const handleDragAndZoom = () => {
        const newUrl = new URLSearchParams(searchParams);
        newUrl.set('viewstate', `${mapRef.current?.getCenter().lng.toFixed(4)},${mapRef.current?.getCenter().lat.toFixed(4)},${mapRef.current?.getZoom().toFixed(2)}`)
        router.replace(`${path}?${newUrl.toString()}`, { scroll: false });
    }

    const handleMarkerClick = (e: any, place_id: number) => {
        setShowPopup(false);
        e.originalEvent.stopPropagation();
        const newUrl = new URLSearchParams(searchParams);
        place_id.toString() === newUrl.get('place')
            ? newUrl.delete('place')
            : newUrl.set('place', place_id.toString())
        router.replace(`${path}?${newUrl.toString()}`, { scroll: false });
    }

    return (
        <Map
            onClick={(e) => handleMapClick(e.lngLat.lat, e.lngLat.lng)}
            reuseMaps={true}
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
            initialViewState={initialViewState}
            onDragEnd={handleDragAndZoom}
            onZoomEnd={handleDragAndZoom}
            attributionControl={false}>

            {places.map((place: Place) =>
                <Marker key={place.id} latitude={place.lat} longitude={place.lng} onClick={(e) => handleMarkerClick(e, place.id)} >
                    <div className='bg-white h-7 w-7 flex items-center justify-center rounded-full shadow-lg border border-blue-500 cursor-pointer hover:scale-110 transition-all ease-in-out'>
                        <p className='text-lg'>{place.emoji}</p>
                    </div>
                </Marker>
            )}

            {showPopup && !place_id && <PopUpWithAddNew lat={clickCoords.lat} lng={clickCoords.lng} />}

            {place_id && <PopUpWithInfo place={places.find(place => place.id === parseInt(place_id))!} />}

            {children}
        </Map>
    )
}
export default MapComponent


// const searchParams = useSearchParams();
// const place = searchParams.get('place');

// const params = useParams();
// const map_id = params.id;