import { fetchUserDetails } from "../lib/data"

export default async function Page() {

    const userDetails = await fetchUserDetails(1);

    return (
        <div>
            <h1>{userDetails.first_name}</h1>
            <h2>{userDetails.last_name}</h2>
        </div>
    )
}