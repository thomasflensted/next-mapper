import Link from "next/link"
import SignUpForm from "../../ui/forms/user/SignUpForm"
import { Cross2Icon, ArrowLeftIcon } from "@radix-ui/react-icons"

const Page = () => {
    return (
        <div className="flex flex-col w-1/4 p-8 border mx-auto rounded-lg h-min shadow-lg relative">
            <h2 className="text-lg font-bold text-blue-600 mb-3">Sign Up</h2>
            <Link href='/'>
                <Cross2Icon className="absolute top-4 right-4 text-gray-500" />
            </Link>
            <SignUpForm />
            <Link href='/signin' className="text-xs underline mt-3">Already have An Account? Sign In Here.</Link>
        </div>
    )
}
export default Page