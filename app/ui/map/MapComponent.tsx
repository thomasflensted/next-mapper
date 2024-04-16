'use client'
import 'mapbox-gl/dist/mapbox-gl.css';

import { Place } from '@/app/lib/definitions';
import { isValidPlaceID, useGetInitialView } from '@/app/scripts/helpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl';
import Markers from '../map-components/Markers';
import PopUpWithAddNew from '../map-components/PopUpWithAddNew';
import PopUpWithInfo from '../map-components/PopUpWithInfo';

const MapComponent = ({ children, places }: { children?: ReactNode, places: Place[] }) => {

    const mapRef = useRef<MapRef>(null);
    const router = useRouter();
    const initialViewState = useGetInitialView();
    const searchParams = useSearchParams()
    const path = usePathname();

    const [clickCoords, setClickCoords] = useState({ lat: 0, lng: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const place_id = isValidPlaceID(searchParams.get('place'), places) ? searchParams.get('place') : null;

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
            dragRotate={false}
            attributionControl={false}>
            <Markers places={places} handleMarkerClick={handleMarkerClick} />
            {showPopup && !place_id && <PopUpWithAddNew lat={clickCoords.lat} lng={clickCoords.lng} />}
            {place_id && <PopUpWithInfo place={places.find(place => place.id === parseInt(place_id))!} />}
            {children}
        </Map>
    )
}
export default MapComponent