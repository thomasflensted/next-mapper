import { useSearchParams } from "next/navigation";
import { Place } from "../lib/definitions";

export const validateFilters = (strArr: string[]) => {
    const validFilters = ['restaurant', 'cafe', 'museum', 'nature', 'sight', 'accommodation', 'memory', 'other'];
    const validatedFilters = strArr.filter(filter => validFilters.includes(filter))
}

export const useGetInitialView = () => {
    const searchParams = useSearchParams();
    if (!searchParams.has('viewstate')) return { longitude: 15, latitude: 20, zoom: 1.5 };
    const viewProps = searchParams.get('viewstate')?.split(',');
    const viewPropsAsNumbers = viewProps?.map(number => parseFloat(number));
    return viewPropsAsNumbers
        ? { longitude: viewPropsAsNumbers[0], latitude: viewPropsAsNumbers[1], zoom: viewPropsAsNumbers[2] }
        : { longitude: 15, latitude: 20, zoom: 1.5 };
}

export const isValidPlaceID = (id: string | null, placeArray: Place[]) => {
    if (!id) return false;
    const placeIds = placeArray.map(place => place.id);
    return placeIds.includes(parseInt(id));
}
