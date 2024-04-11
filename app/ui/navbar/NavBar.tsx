import Link from "next/link"

const NavBar = () => {

    const user = false;

    return (
        <nav className="p-3">
            <ul className="flex justify-between">
                <Link href={user ? '/maps' : '/'}>
                    <li className="font-bold text-xl text-blue-600">Mapper</li>
                </Link>
                <li>
                    <Link href='/signin'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                            {user ? 'Sign Out' : 'Sign In'}
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default NavBar