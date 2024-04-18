import Link from 'next/link';
import Image from 'next/image';

const MapCard = ({ title, desc, emoji, id }: { title: string, desc: string, emoji: string, id: number }) => {

    return (
        <Link href={'/maps/' + id}>
            <div className="relative flex flex-col w-56 h-56 p-2 transition-all duration-200 ease-in-out bg-white border shadow-md cursor-pointer group rounded-xl hover:scale-105" >
                <div className="relative flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg h-72">
                    <Image priority={true} src={'/MapImg.webp'} alt='Image of map' width={220} height={150} />
                    <div className='absolute flex items-center justify-center w-20 h-20 transition-all duration-200 ease-in-out bg-white rounded-full shadow-lg group-hover:scale-90'>
                        <p className='text-3xl'>{emoji}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center h-full gap-1 px-2 py-2 text-center'>
                    <h1 className='px-3 overflow-hidden text-sm font-semibold text-blue-600 whitespace-nowrap text-ellipsis'>{title}</h1>
                    <p className='text-xs font-light text-blue-500 line-clamp-3'>{desc}</p>
                </div>
            </div>
        </Link>
    )
}
export default MapCard