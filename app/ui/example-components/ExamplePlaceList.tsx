import Link from "next/link"
import { ExamplePlace } from "../frontpage/exampleData"

const ExamplePlaceList = ({ handleDivClick, places, currentPlace }: {
    handleDivClick: (e: any, place: ExamplePlace) => void,
    places: ExamplePlace[],
    currentPlace: number | null,
}) => {

    return (
        <div className='absolute top-0 right-0 z-10 h-full p-4 overflow-y-scroll bg-white shadow-lg w-[340px] cursor-default flex flex-col gap-3'>
            {places.map(place =>
                <div id={place.id.toString()}
                    onClick={(e) => handleDivClick(e, place)}
                    key={place.id}
                    className={`border flex flex-col rounded text-left px-4 py-2 ${currentPlace === place.id ? 'border-blue-600' : ''}`}>
                    <div className='flex items-baseline gap-2'>
                        <p className='text-lg'>{place.emoji}</p>
                        <h1 className='inline overflow-hidden text-lg font-medium text-blue-600 whitespace-nowrap text-ellipsis'>{place.name}</h1>
                        <span className=' text-blue-400 text-[11px]'>
                            {place.category.charAt(0).toUpperCase() + place.category.substring(1)}
                        </span>
                    </div>
                    <hr />
                    <p className='mt-2 font-light'>{place.description}</p>
                    <Link
                        href='/api/auth/signin'
                        className='w-full py-1 mt-2 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50'>
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    )
}
export default ExamplePlaceList