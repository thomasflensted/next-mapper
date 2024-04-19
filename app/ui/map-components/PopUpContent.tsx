import { Place } from "@/app/data/places";
import Link from "next/link"
import { usePathname, useSearchParams } from 'next/navigation';

const PopUpContent = ({ place }: { place: Place }) => {

    const sp = useSearchParams()
    const p = usePathname();

    const editParams = new URLSearchParams(sp);
    const adjustParams = new URLSearchParams(sp);

    editParams.delete('place');
    adjustParams.delete('place');
    adjustParams.set('lat', place.lat.toString());
    adjustParams.set('lng', place.lng.toString());

    return (
        <div className='px-2 w-80 flex flex-col text-left gap-1.5'>
            <div className="flex items-baseline overflow-hidden">
                <h1 className='overflow-hidden text-lg font-medium text-blue-600 text-ellipsis whitespace-nowrap'>{place.name}</h1>
                <p className=' ml-2 text-blue-400 text-[11px]'>{place.category.charAt(0).toUpperCase() + place.category.substring(1)}</p>
            </div>
            <hr />
            <p className='font-light'>{place.description}</p>
            <div className='flex gap-1.5 mt-1'>
                <Link
                    href={`${p}/place/${place.id}/edit?${editParams.toString()}`}
                    className='w-full py-1 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50'>
                    Edit
                </Link>
                <Link
                    href={`${p}/place/${place.id}/adjust?${adjustParams.toString()}`}
                    scroll={false}
                    className="w-full py-1 text-center text-blue-600 bg-white border rounded focus:outline-none hover:bg-gray-50">
                    Adjust Location
                </Link>
            </div>
        </div>
    )
}
export default PopUpContent