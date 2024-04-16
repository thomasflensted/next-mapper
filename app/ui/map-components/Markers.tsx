import { Place } from "@/app/lib/definitions"
import { Marker } from "react-map-gl"

const Markers = ({ places, handleMarkerClick }: { places: Place[], handleMarkerClick: (e: any, place_id: number) => void }) => {
    return (
        places.map((place: Place) =>
            <Marker
                key={place.id}
                latitude={place.lat}
                longitude={place.lng}
                onClick={(e) => handleMarkerClick(e, place.id)} >
                <div className='bg-white h-7 w-7 flex items-center justify-center rounded-full shadow-lg border border-blue-500 cursor-pointer hover:scale-110 transition-all ease-in-out'>
                    <p className='text-lg'>{place.emoji}</p>
                </div>
            </Marker>
        )
    )
}
export default Markers