import { selectMapCount } from "@/app/data/maps";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function MapOverviewTop() {

    const session = await auth();
    if (!session || !session.user) redirect('/');
    const mapCount = await selectMapCount(session.user.id);
    const firstName = session.user.name ? session.user.name.split(' ')[0] : '';

    return (
        <div className="flex flex-col items-center mt-6">
            <h2 className="text-3xl font-bold text-blue-600">{'Welcome ' + firstName}</h2>
            <p className="text-blue-600">{mapCount !== 0 ? 'Explore Your Maps' : 'Create Your First Map'}</p>
        </div>
    )
}