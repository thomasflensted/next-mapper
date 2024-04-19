'use client'

import { updatePlaceCoordinates } from "@/app/data/actions/placeActions"
import Link from "next/link"

const AdjustButtons = ({ props }: { props: { map_id: string, place_id: string, viewState: string, lat: string, lng: string } }) => {

    const handleUpdateCoords = () => {
        updatePlaceCoordinates(+props.lat, +props.lng, +props.place_id, +props.map_id, props.viewState);
    }

    return (
        <div className="absolute flex flex-col gap-1 top-3 left-3">
            <div className="px-2 py-1 text-sm font-medium bg-white border rounded shadow-lg">Drag marker to desired location or click on desired location.</div>
            <div className="flex gap-1">
                <Link href={`/maps/${props.map_id}?place=${props.place_id}&viewstate=${props.viewState}`} scroll={false} className="px-2 py-1 text-xs font-light bg-white border rounded shadow-lg hover:bg-gray-50">Cancel</Link>
                <button onClick={handleUpdateCoords} className="px-2 py-1 text-xs font-light bg-white border rounded shadow-lg hover:bg-gray-50">Update Location</button>
            </div>
        </div>
    )
}
export default AdjustButtons