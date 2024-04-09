'use client'

import { useParams } from "next/navigation"

const page = () => {

    const params = useParams();
    const id = params.id;

    return (
        <div>{"Edit Map " + id}</div>
    )
}
export default page