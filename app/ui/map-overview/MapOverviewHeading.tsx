import { fetchMapCount } from "@/app/lib/data/mapData";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function MapOverviewHeading() {

    const { getUser } = getKindeServerSession();
    const user = await getUser()
    const mapCount = await fetchMapCount(1);

    return (
        <>
            <h2 className="text-3xl font-bold text-blue-600">{'Welcome ' + user?.given_name}</h2>
            <p className="text-blue-600">{mapCount !== 0 ? 'Explore Your Maps' : 'Create Your First Map'}</p>
        </>
    )
}