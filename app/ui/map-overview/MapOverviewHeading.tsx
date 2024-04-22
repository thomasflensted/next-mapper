import { selectMapCount } from "@/app/data/maps";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export async function MapOverviewHeading() {

    const session = await auth();
    if (!session || !session.user) redirect('/');
    const mapCount = await selectMapCount(session.user.id);
    const firstName = session.user.name ? session.user.name.split(' ')[0] : '';

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-blue-600">{'Welcome ' + firstName}</h2>
            <p className="text-blue-600">{mapCount !== 0 ? 'Explore Your Maps' : 'Create Your First Map'}</p>
        </div>
    )
}