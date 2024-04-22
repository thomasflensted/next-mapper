import SignInProvider from "@/app/ui/forms/user/SignInProvider.tsx"
import { signIn } from "@/auth"

const Page = () => {
    return (
        <div className="relative flex flex-col items-center justify-center px-8 py-6 mx-auto border rounded-lg shadow-lg h-min w-min">
            <h2 className="mb-4 text-xl font-medium text-blue-600 whitespace-nowrap">Choose a provider sign in with</h2>
            <hr className="w-full" />
            <div className="flex flex-col w-full gap-2 mt-4">
                <SignInProvider provider="google"
                    signIn={async () => {
                        'use server'
                        await signIn("google", { redirectTo: '/maps' })
                    }}>
                </SignInProvider>
                <SignInProvider provider="twitter"
                    signIn={async () => {
                        'use server'
                        await signIn("twitter", { redirectTo: '/maps' })
                    }}>
                </SignInProvider>
                <SignInProvider provider="github"
                    signIn={async () => {
                        'use server'
                        await signIn("github", { redirectTo: '/maps' })
                    }}>
                </SignInProvider>
            </div>
        </div>
    )
}
export default Page