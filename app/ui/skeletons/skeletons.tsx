import Image from "next/image";

export const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export function MapoverViewHeadingSkeleton() {
    return (
        <>
            <h2 className="text-3xl font-bold text-blue-600">Loading details...</h2>
            <p className="text-blue-600">Loading maps...</p>
        </>
    )
}

export function MapGridSkeleton() {

    const cards = ['🗺️', '🏝️', '🏕️', '🌍'];

    return (
        <div className="grid grid-cols-4 gap-6 mt-4">
            {cards.map(card =>
                <div key={card} className={`${shimmer} relative flex flex-col w-56 h-56 p-2 transition-all duration-200 ease-in-out bg-white border shadow-md cursor-pointer group rounded-xl hover:scale-105`} >
                    <div className="relative flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg h-72">
                        <Image priority={true} src={'/MapImg.webp'} alt='Image of map' width={220} height={150} />
                        <div className='absolute flex items-center justify-center w-20 h-20 transition-all duration-200 ease-in-out bg-white rounded-full shadow-md group-hover:scale-90'>
                            <p className='text-3xl'>{card}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center h-full gap-1 px-2 overflow-hidden '>
                        <div className={`w-3/4 h-4 bg-gray-100 rounded-full`}></div>
                        <div className="w-3/4 h-4 bg-gray-100 rounded-full"></div>
                        <div className="w-3/4 h-4 bg-gray-100 rounded-full"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export function MapSkeleton() {
    return (
        <div className={`${shimmer} flex items-center justify-center w-[90%] h-[700px] rounded-xl overflow-hidden shadow-lg border border-lg relative mx-auto cursor-pointer bg-gray-100`}>
            <div className="flex flex-col gap-2">
                <p className="text-4xl">🗺️</p>
                <p className="text-xl font-medium text-blue-500">Loading Map And Places...</p>
            </div>
        </div>
    )
}