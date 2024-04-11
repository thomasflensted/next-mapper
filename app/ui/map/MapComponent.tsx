'use client'

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import Map, { Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PopUpWithAddNew from '../map-components/PopUpWithAddNew';
import Link from 'next/link';

const MapComponent = ({ children }: { children?: ReactNode }) => {

    const [clickCoords, setClickCoords] = useState({ lat: 0, lng: 0 });
    const [showPopup, setShowPopup] = useState(false);

    const handleMapClick = (lat: number, lng: number) => {
        setClickCoords({ lat, lng })
        setShowPopup(!showPopup);
    }

    return (
        <Map
            onClick={(e) => handleMapClick(e.lngLat.lat, e.lngLat.lng)}
            reuseMaps={true}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
            initialViewState={{ longitude: 15, latitude: 20, zoom: 1.5 }}
            attributionControl={false}>

            {showPopup && <PopUpWithAddNew lat={clickCoords.lat} lng={clickCoords.lng} />}

            {children}
        </Map>
    )
}
export default MapComponent


// const searchParams = useSearchParams();
// const place = searchParams.get('place');

// const params = useParams();
// const map_id = params.id;