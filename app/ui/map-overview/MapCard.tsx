import Link from 'next/link';
import Image from 'next/image';

const MapCard = ({ title, desc, emoji, id }: { title: string, desc: string, emoji: string, id: string }) => {

    return (
        <Link href={'/maps/' + id}>
            <div className="bg-white group relative flex flex-col w-56 h-56 p-2 border shadow-md cursor-pointer rounded-xl hover:scale-105 transition-all duration-200 ease-in-out" >
                <div className="bg-blue-100 h-72 rounded-lg relative flex justify-center items-center overflow-hidden">
                    <Image priority={true} src={'/MapImg.webp'} alt='Image of map' width={220} height={150} />
                    <div className='absolute h-20 w-20 rounded-full bg-white shadow-lg flex justify-center items-center group-hover:scale-90 transition-all duration-200 ease-in-out'>
                        <p className='text-3xl'>{emoji}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center h-full px-2 text-center py-2 gap-1'>
                    <h1 className='text-sm font-semibold text-blue-600 whitespace-nowrap px-3 overflow-hidden text-ellipsis'>{title}</h1>
                    <p className='line-clamp-3 text-xs font-light text-blue-500'>{desc}</p>
                </div>
            </div>
        </Link>
    )
}
export default MapCard