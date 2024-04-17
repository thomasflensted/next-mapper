import { fetchMapCount, fetchUserDetails } from "@/app/lib/data";

export async function MapOverviewHeading() {

    const userDetails = await fetchUserDetails(1);
    const mapCount = await fetchMapCount(1);

    return (
        <>
            <h2 className="text-3xl font-bold text-blue-600">{'Welcome ' + userDetails.first_name}</h2>
            <p className="text-blue-600">{mapCount !== 0 ? 'Explore Your Maps' : 'Create Your First Map'}</p>
        </>
    )
}