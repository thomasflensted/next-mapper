'use client'

import { Place } from '@/app/lib/definitions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SortRow from '../map-overview/SortRow'

const MapList = ({ places, currentPlace }: { places: Place[], currentPlace: string }) => {

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
    }

    return (
        <div className='absolute top-0 right-0 z-10 h-full p-4 overflow-y-scroll bg-white shadow-lg w-[340px] cursor-default flex flex-col gap-3'>
            <SortRow currentOrder="desc" currentSort="created_at" />
            {places.map(place =>
                <div onClick={(e) => handleDivClick(e, place.id)} key={place.id} className={`border flex flex-col rounded text-left px-4 py-2 ${+currentPlace === place.id ? 'border-blue-600' : ''}`}>
                    <div className='flex items-baseline gap-2'>
                        <p className='text-lg'>{place.emoji}</p>
                        <h1 className='text-blue-600 font-medium text-lg inline'>{place.name}</h1>
                        <span className=' text-blue-400 text-[11px]'>{place.category.charAt(0).toUpperCase() + place.category.substring(1)}</span>
                    </div>
                    <hr />
                    <p className='font-light mt-2'>{place.description}</p>
                    <div className='flex gap-1.5 mt-2'>
                        <button onClick={(e) => handleEditClick(e, place.id)} className='focus:outline-none w-full border text-center bg-white hover:bg-gray-50 text-blue-600 py-1 rounded'>
                            Update Details
                        </button>
                        <button onClick={(e) => handleAdjustClick(e, place.id, place.lat, place.lng)} className="focus:outline-none bg-white hover:bg-gray-50 text-blue-600 border w-full py-1 rounded text-center">
                            Adjust Location
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MapList