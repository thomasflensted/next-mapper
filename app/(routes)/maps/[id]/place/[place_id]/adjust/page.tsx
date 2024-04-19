import { selectMapDetails } from "@/app/data/maps";
import { selectPlace } from "@/app/data/places";
import AdjustMap from "@/app/ui/map-adjust/AdjustMap";
import AdjustButtons from "@/app/ui/map-controllers/AdjustButtons"
import { notFound } from "next/navigation";

type Props = {
    params: { place_id: string, id: string },
    searchParams: { viewstate: string, lat: string, lng: string }
}

async function Page({ params, searchParams }: Props) {

    const place = await selectPlace(+params.place_id);
    const map = await selectMapDetails(+params.id);
    if (!place || !map) notFound();

    const props = {
        place_id: params.place_id,
        map_id: params.id,
        viewState: searchParams.viewstate,
        lat: searchParams.lat,
        lng: searchParams.lng
    }

    return (
        <div className="absolute top-0 left-0 w-full h-screen">
            <AdjustMap origLat={+place.lat} origLng={+place.lng} emoji={place.emoji}>
                <AdjustButtons props={props} />
            </AdjustMap>
        </div>
    )
}

export default Page;