import { selectMapDetails } from "@/app/data/maps";
import { selectPlace } from "@/app/data/places";
import AdjustMap from "@/app/ui/map-adjust/AdjustMap";
import AdjustButtons from "@/app/ui/map-controllers/AdjustButtons"
import { notFound } from "next/navigation";

type Props = {
    params: { place_id: string, id: string },
    searchParams: { lat: string, lng: string }
}

async function Page({ params, searchParams }: Props) {

    const place = await selectPlace(+params.place_id);
    const map = await selectMapDetails(+params.id);
    const lat = searchParams.lat;
    const lng = searchParams.lng;
    if (!place || !map) notFound();

    return (
        <div className="absolute top-0 left-0 w-full h-screen">
            <AdjustMap origLat={+lat} origLng={+lng} emoji={place.emoji}>
                <AdjustButtons map_id={params.id} place_id={params.place_id} origLat={+lat} origLng={+lng} />
            </AdjustMap>
        </div>
    )
}

export default Page;