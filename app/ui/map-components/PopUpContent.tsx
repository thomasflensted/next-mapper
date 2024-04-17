import { Place } from "@/app/lib/definitions"
import Link from "next/link"
import { usePathname, useSearchParams } from 'next/navigation';

const PopUpContent = ({ place }: { place: Place }) => {

    const searchParams = useSearchParams()
    const path = usePathname();
    const viewState = searchParams.has('viewstate') ? searchParams.get('viewstate') : '15,20,1.5';

    return (
        <div className='px-2 w-64 flex flex-col text-left gap-1.5'>
            <div className="flex items-baseline overflow-hidden">
                <h1 className='overflow-hidden text-lg font-medium text-blue-600 text-ellipsis whitespace-nowrap'>{place.name}</h1>
                <p className=' ml-2 text-blue-400 text-[11px]'>{place.category.charAt(0).toUpperCase() + place.category.substring(1)}</p>
            </div>
            <hr />
            <p className='font-light'>{place.description}</p>
            <div className='flex gap-1.5 mt-1'>
                <Link href={`${path}/place/${place.id}/edit?viewstate=${viewState}`} className='w-full py-1 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50'>
                    Update Details
                </Link>
                <Link href={`${path}/place/${place.id}/adjust?viewstate=${viewState}&lat=${place.lat}&lng=${place.lng}`} scroll={false} className="w-full py-1 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50">
                    Adjust Location
                </Link>
            </div>
        </div >
    )
}
export default PopUpContent