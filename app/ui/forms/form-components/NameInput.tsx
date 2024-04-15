import { ReactNode } from "react"

const NameInput = ({ children, defaultName }: { children: ReactNode, defaultName: string }) => {
    return (
        <div className="flex flex-col">
            <label className="block font-light text-xs mb-0.5">Name</label>
            <input
                defaultValue={defaultName}
                name="name"
                type="text"
                className="border rounded w-full px-2 py-1 text-sm text-gray-700" />
            {children}
        </div>
    )
}
export default NameInput