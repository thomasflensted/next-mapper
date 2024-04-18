import { useControl } from "react-map-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from "mapbox-gl";

const GeoCoder = () => {

    const GeoCoder = () => {
        useControl(() => new MapboxGeocoder({
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
            clearOnBlur: true,
            clearAndBlurOnEsc: true,
            mapboxgl: mapboxgl,
            collapsed: true,
        }));
        return null;
    }

    return (
        <GeoCoder />
    )
}

export default GeoCoder