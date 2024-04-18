import { useSearchParams } from "next/navigation";

export default function useGetInitialView() {

    const searchParams = useSearchParams();
    if (!searchParams.has('viewstate')) return { longitude: 15, latitude: 20, zoom: 1.5 };

    const viewProps = searchParams.get('viewstate')?.split(',').map(number => parseFloat(number));

    return viewProps
        ? { longitude: viewProps[0], latitude: viewProps[1], zoom: viewProps[2] }
        : { longitude: 15, latitude: 20, zoom: 1.5 };
}
