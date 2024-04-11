import ExampleMapCard from "./ExampleMapCard"
import { exampleMaps } from "./exampleData"

export default function ExampleMaps() {
    return (
        <div className="grid grid-cols-4 gap-6 p-10 border shadow-lg rounded-xl">
            {exampleMaps.map(map =>
                <ExampleMapCard
                    emoji={map.emoji}
                    key={map.id}
                    title={map.name}
                    desc={map.description}
                />
            )}
        </div>
    )
}