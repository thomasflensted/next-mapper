import Link from "next/link"

export default async function NavBar() {

    const user = true;

    return (
        <nav className="p-3">
            <ul className="flex justify-between">
                <Link href={'/'}>
                    <li className="text-xl font-bold text-blue-600">Mapper</li>
                </Link>
                <li>
                    {!user &&
                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                            Sign Up
                        </button>
                    }
                    {user &&
                        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                            Sign Out
                        </button>
                    }
                </li>
            </ul>
        </nav>
    )
}