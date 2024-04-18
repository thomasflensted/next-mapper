'use client'

import { Place } from '@/app/lib/definitions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import PlacesSortRow from './PlacesSortRow'
import { RefObject, useEffect } from 'react'
import { MapRef } from 'react-map-gl'
import useFlyToMarker from '@/app/hooks/useFlyToMarker'
import { scrollElementIntoView, sortPlaces } from '@/app/scripts/helpers'

const MapList = ({ places, currentPlace, mapRef }: { places: Place[], currentPlace: string | null, mapRef: RefObject<MapRef> | undefined }) => {

    const p = usePathname()
    const sp = useSearchParams()
    const router = useRouter()

    let nextUrl = new URLSearchParams(sp);

    const handleAdjustClick = (e: any, id: number, lat: number, lng: number) => {
        e.stopPropagation();
        nextUrl.set('lat', lat.toString())
        nextUrl.set('lng', lng.toString())
        router.push(`${p}/place/${id}/adjust?${nextUrl.toString()}`)
    }

    const handleEditClick = (e: any, id: number) => {
        e.stopPropagation();
        router.push(`${p}/place/${id}/edit?${nextUrl.toString()}`)
    }

    const handleDivClick = (e: any, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        nextUrl.set('place', id.toString())
        router.replace(`${p}?${nextUrl.toString()}`, { scroll: false })
        useFlyToMarker(places, id, mapRef);
    }

    useEffect(() => {
        scrollElementIntoView(currentPlace);
    }, [currentPlace])

    const sort = sp.get('sort') || 'created_at';
    const order = sp.get('order') || 'desc';
    const sortedPlaces = sortPlaces(sort, order, places);

    return (
        <div className='absolute top-0 right-0 z-10 h-full p-4 overflow-y-scroll bg-white shadow-lg w-[340px] cursor-default flex flex-col gap-3'>
            <PlacesSortRow />
            {sortedPlaces.map(place =>
                <div id={place.id.toString()} onClick={(e) => handleDivClick(e, place.id)} key={place.id} className={`border flex flex-col rounded text-left px-4 py-2 ${currentPlace === place.id.toString() ? 'border-blue-600' : ''}`}>
                    <div className='flex items-baseline gap-2'>
                        <p className='text-lg'>{place.emoji}</p>
                        <h1 className='inline overflow-hidden text-lg font-medium text-blue-600 whitespace-nowrap text-ellipsis'>{place.name}</h1>
                        <span className=' text-blue-400 text-[11px]'>{place.category.charAt(0).toUpperCase() + place.category.substring(1)}</span>
                    </div>
                    <hr />
                    <p className='mt-2 font-light'>{place.description}</p>
                    <div className='flex gap-1.5 mt-2'>
                        <button onClick={(e) => handleEditClick(e, place.id)} className='w-full py-1 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50'>
                            Update Details
                        </button>
                        <button onClick={(e) => handleAdjustClick(e, place.id, place.lat, place.lng)} className="w-full py-1 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50">
                            Adjust Location
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MapList