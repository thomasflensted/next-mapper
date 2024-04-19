import { Place } from "../data/places";
import { RefObject } from "react";
import { MapRef } from "react-map-gl";

export const isValidPlaceID = (id: string | null, placeArray: Place[]) => {
    if (!id) return false;
    const placeIds = placeArray.map(place => place.id);
    return placeIds.includes(parseInt(id));
}

export const sortPlaces = (sort: string, order: string, places: Place[]) => {

    function sortPlacesByDate(a: Place, b: Place) {
        var dateA = new Date(a.created_at).getTime();
        var dateB = new Date(b.created_at).getTime();
        return order === 'desc'
            ? dateA > dateB ? -1 : 1
            : dateA > dateB ? 1 : -1
    }

    if (sort === 'name' || sort === 'category') {
        return order === 'desc'
            ? places.sort((a, b) => a[sort].localeCompare(b[sort]))
            : places.sort((a, b) => b[sort].localeCompare(a[sort]));
    }
    return places.sort(sortPlacesByDate)
}

export const scrollElementIntoView = (currentPlace: string | null) => {
    if (!currentPlace) return;
    const child = document.getElementById(currentPlace);
    const parent = child?.parentElement;
    if (!child || !parent) return;
    const parentBounds = parent.getBoundingClientRect();
    const childBounds = child.getBoundingClientRect();
    if (childBounds.top < parentBounds.top) {
        parent.scroll({ left: 0, top: child.offsetTop - 15, behavior: 'smooth' });
    } else if (childBounds.bottom > parentBounds.bottom) {
        const bottomOffset = parent.scrollTop + childBounds.bottom - parentBounds.bottom + 15;
        parent.scroll({ left: 0, top: bottomOffset, behavior: 'smooth' });
    }
}

export function flyToMarker(places: Place[], place_id: number, mapRef: RefObject<MapRef> | undefined) {

    const thisPlace = places.find(place => place.id === place_id);
    if (!thisPlace || !mapRef) return;

    const mapContainsMarker = mapRef.current?.getBounds().contains({ lat: thisPlace?.lat, lng: thisPlace?.lng });
    const currentZoomLevel = mapRef.current?.getZoom() || 1.5;

    if (currentZoomLevel < 10 || !mapContainsMarker)
        mapRef.current?.flyTo(
            { center: [thisPlace.lng, thisPlace.lat], zoom: 10, speed: 2.5 })

}