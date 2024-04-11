import Link from "next/link"

const HeadingAndSignUp = ({ heading, text, buttonText }: { heading: string, text?: string, buttonText: string }) => {
    return (
        <div className="text-center flex flex-col gap-6">
            <h1 className="text-3xl text-blue-600 font-bold">{heading}</h1>
            {text && <p className="text-blue-500">{text}</p>}
            <Link href='/signup'>
                <button className="bg-blue-500 hover:bg-blue-600 font-bold text-xl text-white rounded px-6 py-2">{buttonText}</button>
            </Link>
        </div>
    )
}
export default HeadingAndSignUp