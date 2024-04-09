type PageProps = {
    params: { id: string },
    searchParams: { filter: string[], view: string }
}

const Page = ({ params, searchParams }: PageProps) => {

    const filter = searchParams?.filter || null;
    const view = searchParams?.view || 'marker';
    const id = params.id;

    return (
        <div>
            <h1>{`Map: ${id}`}</h1>
            <h1>{`View: ${view}`}</h1>
            <h1>{`Filters: ${filter}`}</h1>
        </div>
    )
}
export default Page