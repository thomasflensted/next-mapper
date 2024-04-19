import { selectMapCount } from "@/app/data/maps";

export async function MapOverviewHeading() {

    const mapCount = await selectMapCount(1);

    return (
        <>
            <h2 className="text-3xl font-bold text-blue-600">{'Welcome'}</h2>
            <p className="text-blue-600">{mapCount !== 0 ? 'Explore Your Maps' : 'Create Your First Map'}</p>
        </>
    )
}