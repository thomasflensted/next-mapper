import { MagnifyingGlassIcon, PieChartIcon } from "@radix-ui/react-icons";
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
        <div className="grid grid-cols-2 gap-3 mt-4 md:gap-6 md:grid-cols-4">
            {cards.map(card =>
                <div key={card} className={`${shimmer} relative flex flex-col w-48 h-56 p-2 transition-all duration-200 ease-in-out bg-white border shadow-md md:w-56 group rounded-xl hover:scale-105`} >
                    <div className="relative flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg h-72">
                        <Image priority={true} src={'/MapImg.webp'} alt='Image of map' width={220} height={150} />
                        <div className='absolute flex items-center justify-center w-20 h-20 transition-all duration-200 ease-in-out bg-white rounded-full shadow-md group-hover:scale-90'>
                            <p className='text-3xl'>{card}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center h-full gap-1 px-2 py-2 text-center'>
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
            <div className="flex flex-col gap-2 px-5 py-3 bg-white border rounded-lg shadow-lg">
                <p className="text-4xl">🗺️</p>
                <p className="text-lg font-medium text-blue-500">Loading Map And Places...</p>
            </div>
        </div>
    )
}

export function MapDetailsSkeleton() {
    return (
        <div className={`flex flex-col gap-6`}>
            <div className="relative flex flex-col items-center gap-6 text-center">
                <p className="mr-2 text-4xl">🗺️</p>
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-xl font-semibold text-blue-600">Loading Map Details...</h1>
                    <p className="text-xs font-medium text-blue-500">0 places</p>
                </div>
                <div className={`w-1/4 h-4 bg-gray-100 rounded-full`}></div>
            </div>
            <div className="flex justify-center gap-2">
                <div className="flex items-center w-20 h-8 px-4 py-2 text-xs font-light text-blue-600 bg-white border rounded group hover:bg-gray-50"></div>
                <div className="flex items-center w-20 h-8 px-4 py-2 text-xs font-light text-blue-600 bg-white border rounded group hover:bg-gray-50"></div>
            </div>
        </div>
    )
}

export function MapFormSkeleton({ type }: { type: 'map' | 'place' }) {
    return (
        <div className="flex flex-col">
            <h2 className="mb-3 text-lg font-bold text-blue-600">Edit {type === 'map' ? 'Map' : 'Place'} Details</h2>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                    <label className="block font-light text-xs mb-0.5">Name</label>
                    <div className="rounded w-full h-7 bg-gray-100 animate-pulse" />
                </div>
                <div className="flex flex-col">
                    <label className="block font-light text-xs mb-0.5">Description</label>
                    <div className="rounded w-full h-24 bg-gray-100 animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="rounded w-1/4 h-6 bg-gray-100 animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                    <div className='bg-white relative border px-2 py-1 rounded flex w-min items-center'>
                        <p className="mr-2 text-xs font-light">Emoji</p>
                        <MagnifyingGlassIcon className="text-xs" />
                    </div>
                    <p className="animate-bounce">⏳</p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                        <div className="rounded w-full h-10 bg-gray-100 animate-pulse" />
                        <div className="rounded w-full h-10 bg-gray-100 animate-pulse" />
                    </div>
                    <div className="rounded w-full h-10 bg-gray-100 animate-pulse" />
                </div>
            </div>
        </div>
    )
}