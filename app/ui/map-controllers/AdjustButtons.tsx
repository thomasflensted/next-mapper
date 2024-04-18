'use client'

import { updatePlaceCoordinates } from "@/app/lib/actions/placeActions"
import Link from "next/link"

const AdjustButtons = ({ props }: { props: { map_id: string, place_id: string, viewState: string, lat: string, lng: string } }) => {

    const handleUpdateCoords = () => {
        updatePlaceCoordinates({ id: +props.place_id, lat: +props.lat, lng: +props.lng, map_id: +props.map_id, viewState: props.viewState })
    }

    return (
        <div className="absolute top-3 left-3 flex gap-1 flex-col">
            <div className="bg-white border shadow-lg rounded px-2 py-1 text-sm font-medium">Drag marker to desired location or click on desired location.</div>
            <div className="flex gap-1">
                <Link href={`/maps/${props.map_id}?place=${props.place_id}&viewstate=${props.viewState}`} scroll={false} className="bg-white shadow-lg border rounded px-2 py-1 text-xs font-light hover:bg-gray-50">Cancel</Link>
                <button onClick={handleUpdateCoords} className="bg-white shadow-lg border rounded px-2 py-1 text-xs font-light hover:bg-gray-50">Update Location</button>
            </div>
        </div>
    )
}
export default AdjustButtons