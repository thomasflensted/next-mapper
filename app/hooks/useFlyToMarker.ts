import { Place } from "../lib/definitions";
import { RefObject } from "react";
import { MapRef } from "react-map-gl";

export default function useFlyToMarker(places: Place[], place_id: number, mapRef: RefObject<MapRef> | undefined) {

    const thisPlace = places.find(place => place.id === place_id);
    if (!thisPlace || !mapRef) return;

    const mapContainsMarker = mapRef.current?.getBounds().contains({ lat: thisPlace?.lat, lng: thisPlace?.lng });
    const currentZoomLevel = mapRef.current?.getZoom() || 1.5;

    if (currentZoomLevel < 10 || !mapContainsMarker)
        mapRef.current?.flyTo(
            { center: [thisPlace.lng, thisPlace.lat], zoom: 10, speed: 2.5 })

}