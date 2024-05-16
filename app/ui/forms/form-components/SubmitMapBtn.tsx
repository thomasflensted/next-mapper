'use  client'

import { useFormStatus } from "react-dom"

const SubmitMapBtn = () => {

    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-1.5 rounded text-sm w-full">
            Save
        </button>
    )
}
export default SubmitMapBtn