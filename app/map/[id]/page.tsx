'use client'

import { useParams, useSearchParams } from "next/navigation"

const page = () => {

    const searchParams = useSearchParams();
    const params = useParams();
    const id = params.id;
    console.log(searchParams.getAll('filter'));

    return (
        <div>{"Map " + id}</div>
    )
}
export default page