'use client'

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const SignInProvider = ({ signIn, provider }: { signIn: () => void, provider: 'github' | 'google' | 'twitter' }) => {

    return (
        <div className="flex items-center justify-center gap-3 py-2 transition-all ease-in-out rounded-md cursor-pointer group hover:scale-105 hover:bg-blue-50"
            onClick={() => signIn()}>
            <div className="flex items-center justify-start w-1/2">
                {provider === 'github' && <FaGithub className="mr-4 text-4xl text-gray-400 transition-colors ease-in-out group-hover:text-blue-600" />}
                {provider === 'twitter' && <FaTwitter className="mr-4 text-4xl text-gray-400 transition-colors ease-in-out group-hover:text-blue-600" />}
                {provider === 'google' && <FaGoogle className="mr-4 text-4xl text-gray-400 transition-colors ease-in-out group-hover:text-blue-600" />}
                <h3 className="text-lg text-gray-400 transition-colors ease-in-out group-hover:text-blue-600">
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                </h3>
            </div>
        </div>
    )
}
export default SignInProvider