import { useSearchParams } from "next/navigation";
import { Place } from "../data/places";
export default function useGetValidPlace(places: Place[]) {

    const sp = useSearchParams();

    const validPlaces = places.map(place => place.id);
    const placeInUrl = sp.get('place');
    const isValidPlace = placeInUrl && validPlaces.includes(+placeInUrl);

    if (!isValidPlace) return null;
    return placeInUrl;
}