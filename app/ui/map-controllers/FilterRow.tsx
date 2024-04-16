const FilterRow = () => {
    return (
        <div className="flex gap-3">
            <p className="font-medium text-blue-500 text-sm">Filter:</p>
            <div className="flex items-center gap-2">
                <input className="block" type="checkbox" name="" id="" />
                <label className="block font-light text-xs" htmlFor="">Restaurants</label>
            </div>
            <div className="flex items-center gap-2">
                <input className="block" type="checkbox" name="" id="" />
                <label className="block font-light text-xs" htmlFor="">Cafes</label>
            </div>
            <div className="flex items-center gap-2">
                <input className="block" type="checkbox" name="" id="" />
                <label className="block font-light text-xs" htmlFor="">Nature</label>
            </div>
            <div className="flex items-center gap-2">
                <input className="block" type="checkbox" name="" id="" />
                <label className="block font-light text-xs" htmlFor="">Sights</label>
            </div>
            <div className="flex items-center gap-2">
                <input className="block" type="checkbox" name="" id="" />
                <label className="block font-light text-xs" htmlFor="">Memories</label>
            </div>
            <div className="flex items-center gap-2">
                <input className="block" type="checkbox" name="" id="" />
                <label className="block font-light text-xs" htmlFor="">Museums</label>
            </div>
            <div className="flex items-center gap-2">
                <input className="block" type="checkbox" name="" id="" />
                <label className="block font-light text-xs" htmlFor="">Other</label>
            </div>
        </div>
    )
}
export default FilterRow