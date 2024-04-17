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