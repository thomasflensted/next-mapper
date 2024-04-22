'use client'
import 'mapbox-gl/dist/mapbox-gl.css';

// hooks and helpers
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import useGetInitialView from '@/app/hooks/useGetInitialView';
import useGetValidPlace from '@/app/hooks/useGetValidPlace';
import { flyToMarker } from '@/app/lib/helpers';

// ui components
import PopUpWithAddNew from '../map-components/PopUpWithAddNew';
import PopUpWithInfo from '../map-components/PopUpWithInfo';
import MapList from '../map-controllers/MapList';
import Markers from '../map-components/Markers';

// react map gl
import Map, { MapRef, FullscreenControl, GeolocateControl } from 'react-map-gl';
import GeoCoder from '../map-controllers/GeoCoder';

// types
import { Place } from '@/app/data/places';

const MapComponent = ({ places }: { places: Place[] }) => {

    const mapRef = useRef<MapRef>(null);

    const path = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()
    const initialViewState = useGetInitialView();

    const [showPopup, setShowPopup] = useState(false);
    const [clickCoords, setClickCoords] = useState({ lat: 0, lng: 0 });

    const place_id = useGetValidPlace(places);

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
        flyToMarker(places, place_id, mapRef);
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
            mapboxAccessToken={process.env.MAPBOX_TOKEN}
            mapStyle={process.env.MAPBOX_STYLE}
            initialViewState={initialViewState}
            onDragEnd={handleDragAndZoom}
            onZoomEnd={handleDragAndZoom}
            dragRotate={false}
            attributionControl={false}>

            <GeoCoder />
            <FullscreenControl position='top-left' />
            <GeolocateControl position='bottom-right' />
            <Markers places={places} handleMarkerClick={handleMarkerClick} />
            {showPopup && !place_id && <PopUpWithAddNew lat={clickCoords.lat} lng={clickCoords.lng} />}
            {place_id && <PopUpWithInfo place={places.find(place => place.id === parseInt(place_id))!} />}
            {searchParams.get('view') === 'list' && <MapList places={places} currentPlace={place_id} mapRef={mapRef} />}

        </Map>
    )
}
export default MapComponent