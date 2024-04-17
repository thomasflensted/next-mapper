import SortItem from "../map-overview/SortItem"

const PlacesSortRow = () => {
    return (
        <div className="flex gap-2 items-center justify-between">
            <h3 className="text-blue-600 text-xs">Order By:</h3>
            <SortItem prop='created_at' text="Created" />
            <SortItem prop='name' text="Name" />
            <SortItem prop='category' text="Category" />
        </div>
    )
}
export default PlacesSortRow