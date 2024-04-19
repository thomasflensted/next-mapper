import { Place } from "@/app/data/places"
import { Marker } from "react-map-gl"

const Markers = ({ places, handleMarkerClick }: { places: Place[], handleMarkerClick: (e: any, place_id: number) => void }) => {
    return (
        places.map((place: Place) =>
            <Marker
                key={place.id}
                latitude={+place.lat}
                longitude={+place.lng}
                onClick={(e) => handleMarkerClick(e, place.id)} >
                <div className='flex items-center justify-center transition-all ease-in-out bg-white border border-blue-500 rounded-full shadow-lg cursor-pointer h-7 w-7 hover:scale-110'>
                    <p className='text-lg'>{place.emoji}</p>
                </div>
            </Marker>
        )
    )
}
export default Markers