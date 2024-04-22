'use client'
import 'mapbox-gl/dist/mapbox-gl.css';

import { ReactNode, useRef } from "react"
import Map, { MapRef, Marker } from 'react-map-gl';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import useGetInitialView from '@/app/hooks/useGetInitialView';

const AdjustMap = ({ children, origLat, origLng, emoji }: { children: ReactNode, origLat: number, origLng: number, emoji: string }) => {

    const mapRef = useRef<MapRef>(null);
    const initialViewState = useGetInitialView();
    const searchParams = useSearchParams();
    const path = usePathname();
    const router = useRouter();

    const handleMapDragAndMapZoom = () => {
        let newUrl = new URLSearchParams(searchParams);
        updateViewState(newUrl)
    }

    const handleMapClickAndMarkerDrag = (lng: number, lat: number) => {
        let newUrl = new URLSearchParams(searchParams);
        updateLatLng(newUrl, lat, lng)
    }

    const updateViewState = (newUrl: URLSearchParams) => {
        newUrl.set('viewstate', `${mapRef.current?.getCenter().lng.toFixed(4)},${mapRef.current?.getCenter().lat.toFixed(4)},${mapRef.current?.getZoom().toFixed(2)}`)
        router.replace(`${path}?${newUrl.toString()}`, { scroll: false });
    }

    const updateLatLng = (newUrl: URLSearchParams, lat: number, lng: number) => {
        newUrl.set('lat', lat.toString())
        newUrl.set('lng', lng.toString())
        router.replace(`${path}?${newUrl.toString()}`);
    }

    return (
        <Map
            ref={mapRef}
            onClick={(e) => handleMapClickAndMarkerDrag(e.lngLat.lng, e.lngLat.lat)}
            reuseMaps={true}
            onDragEnd={handleMapDragAndMapZoom}
            onZoomEnd={handleMapDragAndMapZoom}
            mapboxAccessToken={process.env.MAPBOX_TOKEN}
            mapStyle={process.env.MAPBOX_STYLE}
            initialViewState={initialViewState}
            attributionControl={false}
            dragRotate={false}>

            <Marker
                key={origLat + origLng}
                latitude={parseFloat(searchParams.get('lat') as string)}
                longitude={parseFloat(searchParams.get('lng') as string)}
                draggable={true}
                onDragEnd={(e) => handleMapClickAndMarkerDrag(e.lngLat.lng, e.lngLat.lat)}>
                <div className='flex items-center justify-center transition-all ease-in-out bg-white border border-blue-500 rounded-full shadow-lg cursor-pointer h-7 w-7 hover:scale-110'>
                    <p className='text-lg'>{emoji}</p>
                </div>
            </Marker>

            {children}

        </Map >
    )
}
export default AdjustMap