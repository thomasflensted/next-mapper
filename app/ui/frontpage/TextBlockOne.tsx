import Link from "next/link"

const TextBlockOne = () => {
    return (
        <div className="w-3/4 md:w-1/2">
            <p className="text-xs font-light leading-6 text-center text-blue-600 md:text-sm md:leading-8">
                That <span className="font-medium">amazing local restaurant</span> you visited 8 years ago in Larache, Morocco? That <span className="font-medium">beautiful view </span>you've been thinking about since your trip to Kyrgyzstan? That <span className="font-medium">cute hotel</span> in Vientiane, Laos that you're still fantasizing about? Never forget any of those with
                <Link href='/signin' className="font-medium">
                    &nbsp;Mapper.
                </Link>
            </p>
        </div>
    )
}
export default TextBlockOne