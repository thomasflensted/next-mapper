import { ReactNode } from "react"

const DescriptionInput = ({ defaultDescription, children }: { defaultDescription: string, children: ReactNode }) => {
    return (
        <div className="flex flex-col">
            <label className="block font-light text-xs mb-0.5">Description</label>
            <textarea
                maxLength={200}
                name="description"
                rows={4}
                defaultValue={defaultDescription}
                className="border rounded w-full px-2 py-1 text-sm text-gray-700 resize-none" />
            {children}
        </div>
    )
}
export default DescriptionInput