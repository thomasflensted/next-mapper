import { Place } from "@/app/data/places";
import Link from "next/link"
import { usePathname, useSearchParams } from 'next/navigation';
import img_example from '/public/img_example.png'
import img_example2 from '/public/img_example2.png'
import { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
const PopUpContent = ({ place }: { place: Place }) => {

    const sp = useSearchParams()
    const p = usePathname();

    const editParams = new URLSearchParams(sp);
    const adjustParams = new URLSearchParams(sp);

    editParams.delete('place');
    adjustParams.delete('place');
    adjustParams.set('lat', place.lat.toString());
    adjustParams.set('lng', place.lng.toString());

    const imgs = [img_example, img_example2]
    const [currentImage, setCurrentImage] = useState(0);

    const incrementImg = (curNum: number) => {
        if (curNum === imgs.length - 1) return setCurrentImage(0)
        setCurrentImage(curNum + 1)
    }

    const decrementImg = (curNum: number) => {
        if (curNum === 0) return setCurrentImage(imgs.length - 1)
        setCurrentImage(curNum - 1)
    }

    return (
        <div className='px-2 w-80 flex flex-col text-left gap-1.5'>
            <div className="flex items-baseline overflow-hidden">
                <h1 className='overflow-hidden text-lg font-medium text-blue-600 text-ellipsis whitespace-nowrap'>{place.name}</h1>
                <p className=' ml-2 text-blue-400 text-[11px]'>{place.category.charAt(0).toUpperCase() + place.category.substring(1)}</p>
            </div>
            <hr />
            {place.description && <p className='font-light'>{place.description}</p>}
            <div className="w-full h-auto overflow-hidden rounded-md relative">
                <FaChevronCircleLeft onClick={() => decrementImg(currentImage)} className="text-white text-lg absolute -translate-y-1/2 top-1/2 left-2 opacity-50 hover:opacity-85 transition" />
                <FaChevronCircleRight onClick={() => incrementImg(currentImage)} className="text-white text-lg absolute -translate-y-1/2 top-1/2 right-2 opacity-50 hover:opacity-85 transition" />
                {/* <img src='/public/img_example.png' alt="" /> */}
                {/* <Image src={imgs[currentImage]} height={200} width={400} alt="Image" /> */}
            </div>
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
        </div >
    )
}
export default PopUpContent