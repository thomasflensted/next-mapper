import { fetchUserDetails, fetchMapCount } from "../lib/data"
import MapGrid from "../ui/map-overview/MapGrid";
import SortRow from "../ui/map-overview/SortRow";

export default async function Page({ searchParams }: { searchParams: { sort: string, order: string } }) {

    const userDetails = await fetchUserDetails('2be0f326-4cc4-4c36-a87e-39b4c8d778d0');
    const mapCount = await fetchMapCount('2be0f326-4cc4-4c36-a87e-39b4c8d778d0');

    const sort = ['name', 'created_at', 'updated_at'].includes(searchParams.sort) ? searchParams.sort : 'created_at';
    const order = searchParams.order ? searchParams.order : 'desc';

    return (
        <div className="flex flex-col items-center w-full gap-3 my-8">
            <h2 className="font-bold text-3xl text-blue-600">{'Welcome ' + userDetails.first_name}</h2>
            <p className="text-blue-600">{mapCount !== 0 ? 'Explore Your Maps' : 'Create Your First Map'}</p>
            <SortRow currentSort={sort} currentOrder={order} />
            <MapGrid sort={sort} order={order} />
        </div>
    )
}