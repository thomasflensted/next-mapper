import Link from "next/link"
import { ExamplePlace } from "../frontpage/exampleData";

const PopUpContentExample = ({ place }: { place: ExamplePlace }) => {

    return (
        <div className='px-2 w-80 flex flex-col text-left gap-1.5'>
            <div className="flex items-baseline overflow-hidden">
                <h1 className='overflow-hidden text-lg font-medium text-blue-600 text-ellipsis whitespace-nowrap'>{place.name}</h1>
                <p className=' ml-2 text-blue-400 text-[11px]'>{place.category.charAt(0).toUpperCase() + place.category.substring(1)}</p>
            </div>
            <hr />
            <p className='font-light'>{place.description}</p>
            <Link
                href='/signin'
                className='w-full py-1 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50'>
                Sign up to explore all features of the map.
            </Link>
        </div>
    )
}
export default PopUpContentExample;