'use client'

import { useState, useEffect } from "react";

export default function useFlyTo() {

    const [flyToIsEnabled, setFlyToIsEnabled] = useState(false);

    if (typeof window !== "undefined") {
        const rawData = localStorage.getItem('flyto');
        const initialValue = rawData ? JSON.parse(rawData) : false;
        setFlyToIsEnabled(initialValue);
    }

    useEffect(() => {
        localStorage.setItem('flyto', JSON.stringify(flyToIsEnabled));
    }, [flyToIsEnabled])

    return { flyToIsEnabled, setFlyToIsEnabled }
}