const SignUpForm = () => {
    return (
        <form className="flex flex-col gap-6">
            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5" htmlFor="">Email</label>
                <input className="border rounded w-full px-2 py-1 text-sm text-gray-700" type="email" />
            </div>
            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5" htmlFor="">Password</label>
                <input className="border rounded w-full px-2 py-1 text-sm font-medium text-gray-500" type="password" />
            </div>
            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5" htmlFor="">Confirm Password</label>
                <input className="border rounded w-full px-2 py-1 text-sm font-medium text-gray-500" type="password" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm">Sign Up</button>
        </form>
    )
}
export default SignUpForm