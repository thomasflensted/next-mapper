'use client'

import { useParams, useSearchParams } from "next/navigation"

const page = () => {

    const searchParams = useSearchParams();
    const params = useParams();
    const id = params.id;
    const filters = searchParams.getAll('filter');
    const view = searchParams.get('view') ? searchParams.get('view') : 'marker';

    return (
        <>
            <div>{"Map " + id}</div>
            <h1 className="font-bold">Filters:</h1>
            <div>{filters.map(filter => <h2 key={filter[0]}>{filter}</h2>)}</div>
            <h2>{view}</h2>
        </>
    )
}
export default page