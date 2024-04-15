import { Place } from "@/app/lib/definitions"
import Link from "next/link"
import { useParams, usePathname, useSearchParams } from 'next/navigation';

const PopUpContent = ({ place }: { place: Place }) => {

    const searchParams = useSearchParams()
    const path = usePathname();
    const params = useParams()
    const map_id = params.id;
    const viewState = searchParams.has('viewstate') ? searchParams.get('viewstate') : '15,20,1.5';

    return (
        <div className='px-2 w-64 flex flex-col text-left gap-1.5'>
            <div>
                <h1 className='text-blue-600 font-medium text-lg inline'>{place.name}</h1>
                <span className='inline ml-2 text-blue-400 text-[11px]'>{place.category.charAt(0).toUpperCase() + place.category.substring(1)}</span>
            </div>
            <hr />
            <p className='font-light'>{place.description}</p>
            <div className='flex gap-1.5 mt-1'>
                <Link href={`${path}/place/${place.id}/edit?viewstate=${viewState}`} className='w-full border text-center bg-white hover:bg-gray-50 text-blue-600 py-1 rounded'>
                    Update Details
                </Link>
                <Link href={`${path}/place/${place.id}/adjust`} className="bg-white hover:bg-gray-50 text-blue-600 border w-full py-1 rounded text-center">
                    Adjust Location
                </Link>
            </div>
        </div >
    )
}
export default PopUpContent