'use client'

import { updatePlaceCoordinates } from "@/app/data/actions/placeActions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const AdjustButtons = ({ map_id, place_id, origLat, origLng }: { map_id: string, place_id: string, origLat: number, origLng: number }) => {

    const sp = useSearchParams();
    const returnUrl = new URLSearchParams(sp);
    const lat = returnUrl.get('lat') || origLat
    const lng = returnUrl.get('lng') || origLng

    const handleUpdateCoords = () => {
        updatePlaceCoordinates(+lat, +lng, +place_id, +map_id, returnUrl);
    }

    return (
        <div className="absolute flex flex-col gap-1 top-3 left-3">
            <div className="px-2 py-1 text-sm font-medium bg-white border rounded shadow-lg">Drag marker to desired location or click on desired location.</div>
            <div className="flex gap-1">
                <Link href={`/maps/${map_id}?${returnUrl.toString()}`} scroll={false} className="px-2 py-1 text-xs font-light bg-white border rounded shadow-lg hover:bg-gray-50">Cancel</Link>
                <button onClick={handleUpdateCoords} className="px-2 py-1 text-xs font-light bg-white border rounded shadow-lg hover:bg-gray-50">Update Location</button>
            </div>
        </div>
    )
}
export default AdjustButtons