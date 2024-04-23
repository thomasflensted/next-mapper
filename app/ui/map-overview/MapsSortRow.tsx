import SortItem from "./SortItem";

const MapsSortRow = () => {

    return (
        <div className="flex gap-2 items-center">
            <h3 className="text-blue-600 text-xs">Order By:</h3>
            <SortItem prop="created_at" text='Created' />
            <SortItem prop='updated_at' text="Modified" />
            <SortItem prop='name' text="Name" />
        </div>
    )
}
export default MapsSortRow