import { ArrowRightIcon } from "@radix-ui/react-icons"
import Image from 'next/image';

const CreateNewMapCard = () => {
    return (
        <div className="bg-white group relative flex flex-col w-56 h-56 p-2 border shadow-md cursor-pointer rounded-xl hover:scale-105 transition-all duration-200 ease-in-out" >
            <div className="bg-blue-100 h-72 rounded-lg relative flex justify-center items-center overflow-hidden">
                <Image priority={true} src={'/MapImg.webp'} alt='Image of map' width={220} height={150} />
                <div className='absolute h-20 w-20 rounded-full bg-white shadow-md flex justify-center items-center group-hover:scale-90 transition-all duration-200 ease-in-out'>
                    <p className='text-3xl'>🗺️</p>
                </div>
            </div>
            <div className='flex flex-col justify-center h-full px-2 overflow-hidden text-center text-ellipsis items-center'>
                <h3 className='my-1 text-sm font-semibold text-blue-600 whitespace-nowrap'>Create New Map</h3>
                <ArrowRightIcon className="text-blue-600 ml-2 group-hover:translate-x-3 transition-all duration-200" />
            </div>
        </div>
    )
}
export default CreateNewMapCard