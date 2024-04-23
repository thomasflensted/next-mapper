import Link from "next/link"
import ExampleMapCard from "./ExampleMapCard"
import { exampleMaps } from "./exampleData"

export default function ExampleMaps() {
    return (
        <div className="grid grid-cols-4 gap-6 p-10 border shadow-lg rounded-xl">
            {exampleMaps.map(map =>
                <Link href='signin' key={map.id}>
                    <ExampleMapCard
                        emoji={map.emoji}
                        title={map.name}
                        desc={map.description}
                    />
                </Link>
            )}
        </div>
    )
}