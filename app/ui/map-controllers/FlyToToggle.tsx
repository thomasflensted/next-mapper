'use client'

import { motion } from "framer-motion"
import { Istok_Web } from "next/font/google"
import { useState } from "react"

const FlyToToggle = () => {

    const [isToggled, setIsToggled] = useState(false)

    return (
        <div className="flex items-center gap-2" onClick={() => setIsToggled(!isToggled)}>
            <div className={`h-5 w-8 border ${!isToggled ? 'border-blue-500' : 'border-blue-200'} rounded-full flex items-center relative whitespace-nowrap`}>
                <motion.div
                    animate={{ x: !isToggled ? 12 : 0, backgroundColor: isToggled ? '#dbeafe' : '#3b82f6' }}
                    transition={{ duration: 0.1, type: 'tween' }}
                    className=" h-4 rounded-full w-4 absolute left-[1px]">
                </motion.div>
            </div>
            <p className={`text-xs font-medium ${!isToggled ? 'text-blue-500' : 'text-blue-200'}`}>Fly To marker</p>
        </div>
    )
}

export default FlyToToggle