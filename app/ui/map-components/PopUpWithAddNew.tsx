'use client'

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Popup } from 'react-map-gl';

const PopUpWithAddNew = ({ lat, lng }: { lat: number, lng: number }) => {

    const { id } = useParams();
    const searchParams = useSearchParams();
    const view = searchParams.get('viewstate') ?? '15,20,1.5';

    return (
        <Popup
            key={lat + lng}
            longitude={lng}
            latitude={lat}
            maxWidth='200'
            closeButton={false}>
            <div className='px-2'>
                <Link href={`/maps/${id}/place/create?lat=${lat}&lng=${lng}&viewstate=${view}`}>
                    <button className='w-full px-4 py-2 mt-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'>
                        Add New Place
                    </button>
                </Link>
            </div>
        </Popup >)
}
export default PopUpWithAddNew