import { ArrowRightIcon } from "@radix-ui/react-icons"
import Image from 'next/image';

const CreateNewMapCard = () => {
    return (
        <div className="relative flex flex-col w-48 h-56 p-2 transition-all duration-200 ease-in-out bg-white border shadow-md cursor-pointer md:w-56 group rounded-xl hover:scale-105" >
            <div className="relative flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg h-72">
                <Image priority={true} src={'/MapImg.webp'} alt='Image of map' width={220} height={150} />
                <div className='absolute flex items-center justify-center w-20 h-20 transition-all duration-200 ease-in-out bg-white rounded-full shadow-md group-hover:scale-90'>
                    <p className='text-3xl'>🗺️</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center h-full gap-1 px-2 py-2 text-center'>
                <h3 className='my-1 text-sm font-semibold text-blue-600 whitespace-nowrap'>Create New Map</h3>
                <ArrowRightIcon className="ml-2 text-blue-600 transition-all duration-200 group-hover:translate-x-3" />
            </div>
        </div>
    )
}
export default CreateNewMapCard