'use client'

import { Place } from '@/app/lib/definitions';
import { Popup } from 'react-map-gl';
import PopUpContent from './PopUpContent';

const PopUpWithInfo = ({ place }: { place: Place }) => {

    return (
        <Popup
            offset={17}
            key={place.lat + place.lng}
            longitude={place.lng}
            latitude={place.lat}
            maxWidth='200'
            closeButton={false}>
            <PopUpContent place={place} />
        </Popup >
    )
}

export default PopUpWithInfo