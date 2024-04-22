'use client'

const SignOutButton = ({ signOut }: { signOut: () => void }) => {
    return (
        <button onClick={() => signOut()}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
            Sign Out
        </button>
    )
}
export default SignOutButton