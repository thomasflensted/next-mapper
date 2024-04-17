import { fetchUserDetails, fetchMapCount } from "../lib/data"
import MapGrid from "../ui/map-overview/MapGrid";
import MapsSortRow from "../ui/map-overview/MapsSortRow";

export default async function Page({ searchParams }: { searchParams: { sort: string, order: string } }) {

    const userDetails = await fetchUserDetails(1);
    const mapCount = await fetchMapCount(1);

    const sort = ['name', 'created_at', 'updated_at'].includes(searchParams.sort) ? searchParams.sort : 'created_at';
    const order = searchParams.order ? searchParams.order : 'desc';

    return (
        <div className="flex flex-col items-center w-full gap-3 my-8">
            <h2 className="font-bold text-3xl text-blue-600">{'Welcome ' + userDetails.first_name}</h2>
            <p className="text-blue-600">{mapCount !== 0 ? 'Explore Your Maps' : 'Create Your First Map'}</p>
            <MapsSortRow />
            <MapGrid sort={sort} order={order} />
        </div>
    )
}