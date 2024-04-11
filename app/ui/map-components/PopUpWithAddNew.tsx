'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Popup } from 'react-map-gl';

const PopUpWithAddNew = ({ lat, lng }: { lat: number, lng: number }) => {

    const { id } = useParams();

    return (
        <Popup
            key={lat + lng}
            longitude={lng}
            latitude={lat}
            maxWidth='200'
            closeButton={false}
            anchor="bottom">
            <div className='px-2'>
                <Link href={`/maps/${id}/place/create`}>
                    <button className='mt-1 w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-medium text-white rounded'>Add New Place</button>
                </Link>
            </div>
        </Popup >)
}
export default PopUpWithAddNew