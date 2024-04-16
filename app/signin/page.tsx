import Link from "next/link"
import { Cross2Icon } from "@radix-ui/react-icons"
import SignInForm from "../ui/forms/user/SignInForm"

const Page = () => {
    return (
        <div className="flex flex-col w-1/4 p-8 border mx-auto rounded-lg h-min shadow-lg relative">
            <h2 className="text-lg font-bold text-blue-600 mb-3">Sign In</h2>
            <Link href='/'>
                <Cross2Icon className="absolute top-4 right-4 text-gray-500" />
            </Link>
            <SignInForm />
            <Link href='/signup' className="text-xs underline mt-3">New User? Sign Up Here.</Link>
        </div>
    )
}
export default Page