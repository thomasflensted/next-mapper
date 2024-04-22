'use client'

import { ExamplePlace } from '../frontpage/exampleData';
import { Popup } from 'react-map-gl';
import PopUpContentExample from './PopUpContentExample';

const PopUpWithInfoExample = ({ place }: { place: ExamplePlace }) => {

    return (
        <Popup
            offset={17}
            key={place.lat + place.lng}
            longitude={+place.lng}
            latitude={+place.lat}
            maxWidth='200'
            closeButton={false}>
            <PopUpContentExample place={place} />
        </Popup >
    )
}

export default PopUpWithInfoExample