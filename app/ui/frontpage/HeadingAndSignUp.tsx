import Link from "next/link"

const HeadingAndSignUp = ({ heading, text, buttonText }: { heading: string, text?: string, buttonText: string }) => {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="w-2/3 text-2xl font-bold text-blue-600 md:w-full md:text-3xl">{heading}</h1>
            {text && <p className="text-sm text-blue-500 md:text-lg">{text}</p>}
            <Link href='/signin'>
                <button className="px-6 py-2 text-xl font-bold text-white bg-blue-500 rounded hover:bg-blue-600">{buttonText}</button>
            </Link>
        </div>
    )
}
export default HeadingAndSignUp