const CategoryDropdown = ({ defaultCategory }: { defaultCategory: string }) => {
    return (
        <select className="px-2 py-1 text-xs font-light bg-white border rounded w-min" name="category" defaultValue={defaultCategory}>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Café</option>
            <option value="museum">Museum</option>
            <option value="nature">Nature</option>
            <option value="sight">Sight</option>
            <option value="accommodation">Accommodation</option>
            <option value="memory">Memory</option>
            <option value="other">Other</option>
        </select>
    )
}
export default CategoryDropdown