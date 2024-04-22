import Link from "next/link"
import { auth, signOut } from "@/auth"
import SignOutButton from "./SignOutButton";

export default async function NavBar() {

    const session = await auth();
    const user = session?.user;

    return (
        <nav className="p-3">
            <ul className="flex justify-between">
                <Link href={'/'}>
                    <li className="text-xl font-bold text-blue-600">Mapper</li>
                </Link>
                <li>
                    {!user &&
                        <Link href='/signin'>
                            <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                                Sign In
                            </button>
                        </Link>
                    }
                    {user && <SignOutButton signOut={async () => {
                        "use server"
                        await signOut({ redirectTo: '/' })
                    }} />}
                </li>
            </ul>
        </nav>
    )
}