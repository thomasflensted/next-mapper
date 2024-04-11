'use client'

import { Place } from '@/app/lib/definitions'
import { motion } from 'framer-motion'

const MapList = ({ places }: { places: Place[] }) => {
    return (
        <motion.div className='absolute top-0 right-0 z-10 h-full gap-4 p-4 overflow-y-scroll bg-white shadow-lg w-[340px] cursor-default'>
            {places.map(place =>
                <div key={place.id}>
                    <h2>{place.name}</h2>
                    <h3>{place.category}</h3>
                    <p>{place.description}</p>
                </div>
            )}
        </motion.div>
    )
}
export default MapList