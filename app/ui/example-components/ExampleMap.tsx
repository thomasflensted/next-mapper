'use client'
import 'mapbox-gl/dist/mapbox-gl.css';

import { useRef, useState } from "react"
import { Map, GeolocateControl, Marker, useControl } from "react-map-gl"
import { ExamplePlace, examplePlaces } from "../frontpage/exampleData";
import PopUpWithSignUp from './PopUpWithSignUp';
import PopUpWithInfoExample from './PopUpWithInfoExample';
import GeoCoder from '../map-controllers/GeoCoder';
import ExamplePlaceList from './ExamplePlaceList';
import { flyToMarker, scrollElementIntoView } from '@/app/lib/helpers';

const ExampleMap = () => {

    const mapRef = useRef(null)
    const [showPopup, setShowPopup] = useState(false);
    const [clickCoords, setClickCoords] = useState({ lng: 0, lat: 0 });
    const [place, setPlace] = useState<ExamplePlace | null>(null);
    const [listIsVisible, setListIsVisible] = useState(false)

    const handleMapClick = (lat: number, lng: number) => {
        setPlace(null);
        setShowPopup(!showPopup);
        setClickCoords({ lat, lng })
    }

    const handleDivClick = (e: any, clickedPlace: ExamplePlace) => {
        setPlace(clickedPlace);
        console.log(clickedPlace);
        setShowPopup(true);
        if (place) flyToMarker(examplePlaces, clickedPlace.id, mapRef)
    }

    const handleMarkerClick = (e: any, thisPlace: ExamplePlace) => {
        e.originalEvent.stopPropagation();
        if (place) {
            if (place.id === thisPlace.id) {
                setPlace(null)
                setShowPopup(false);
            } else setPlace(thisPlace)
        } else {
            setPlace(thisPlace)
            setShowPopup(true);
        }
        scrollElementIntoView(thisPlace.id)
    }



    return (
        <div className='w-full'>
            <div className="flex w-[90%] mx-auto justify-end mb-1">
                <p
                    onClick={() => setListIsVisible(!listIsVisible)}
                    className="font-medium text-blue-500 text-xs border px-2 py-0.5 rounded hover:bg-gray-50 cursor-pointer">
                    {listIsVisible ? 'Hide List' : 'Show List'}
                </p>
            </div>
            <div className="w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative mx-auto cursor-pointer">
                <Map
                    onClick={(e) => handleMapClick(e.lngLat.lat, e.lngLat.lng)}
                    reuseMaps={true}
                    ref={mapRef}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                    mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
                    initialViewState={{ latitude: 15, longitude: 25, zoom: 1.5 }}
                    dragRotate={false}
                    attributionControl={false}>

                    <GeoCoder />
                    <GeolocateControl position="top-left" />

                    {showPopup && !place && <PopUpWithSignUp lat={clickCoords.lat} lng={clickCoords.lng} />}
                    {showPopup && place && <PopUpWithInfoExample place={place} />}

                    {examplePlaces.map((place) =>
                        <Marker
                            key={place.id}
                            latitude={place.lat}
                            longitude={place.lng}
                            onClick={(e) => handleMarkerClick(e, place)} >
                            <div className='flex items-center justify-center transition-all ease-in-out bg-white border border-blue-500 rounded-full shadow-lg cursor-pointer h-7 w-7 hover:scale-110'>
                                <p className='text-lg'>{place.emoji}</p>
                            </div>
                        </Marker>
                    )}

                    {listIsVisible &&
                        <ExamplePlaceList places={examplePlaces} handleDivClick={handleDivClick} currentPlace={place ? place.id : null} />}

                </Map>
            </div>
        </div>
    )
}
export default ExampleMap