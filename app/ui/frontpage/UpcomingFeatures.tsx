const UpcomingFeatures = () => {
    return (
        <div className="flex flex-col w-2/3 gap-2 p-6 text-center border shadow-lg rounded-xl">
            <h2 className="mb-4 font-bold text-blue-600">Upcoming Features</h2>
            <div className="flex w-full gap-2">
                <div className="w-full p-6 text-center border rounded-lg shadow-sm">
                    <h3 className="mb-1 text-sm font-semibold text-blue-600 whitespace-nowrap">Auto-Add Place To Map</h3>
                </div>
                <div className="w-full p-6 text-center border rounded-lg shadow-sm">
                    <h3 className="mb-1 text-sm font-semibold text-blue-600 whitespace-nowrap">Upload Images</h3>
                </div>
                <div className="w-full p-6 text-center border rounded-lg shadow-sm">
                    <h3 className="mb-1 text-sm font-semibold text-blue-600 whitespace-nowrap">Share Maps and Places</h3>
                </div>
            </div>
            <div className="flex w-full gap-2">
                <div className="w-full p-6 text-center border rounded-lg shadow-sm">
                    <h3 className="mb-1 text-sm font-semibold text-blue-600 whitespace-nowrap">Collaborate On Maps</h3>
                </div>
                <div className="w-full p-6 text-center border rounded-lg shadow-sm">
                    <h3 className="mb-1 text-sm font-semibold text-blue-600 whitespace-nowrap">Auto-Zoom To Markers</h3>
                </div>
                <div className="w-full p-6 text-center border rounded-lg shadow-sm">
                    <h3 className="mb-1 text-sm font-semibold text-blue-600 whitespace-nowrap">Duplicate Map With Markers</h3>
                </div>
            </div>
        </div>
    )
}

export default UpcomingFeatures