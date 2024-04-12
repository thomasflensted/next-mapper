import SortItem from "./SortItem";

const SortRow = ({ currentSort, currentOrder }: { currentSort: string, currentOrder: string }) => {

    return (
        <div className="flex gap-2 items-center">
            <h3 className="text-blue-600 text-xs">Order By:</h3>
            <SortItem currentOrder={currentOrder} currentSort={currentSort} prop='created_at' text="Created" />
            <SortItem currentOrder={currentOrder} currentSort={currentSort} prop='updated_at' text="Modified" />
            <SortItem currentOrder={currentOrder} currentSort={currentSort} prop='name' text="Name" />
        </div>
    )
}
export default SortRow