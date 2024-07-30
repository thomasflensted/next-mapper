import FlyToToggle from "./FlyToToggle"
import ViewToggle from "./ViewToggle"

const ControllerRow = () => {
    return (
        <div className="flex w-[90%] mx-auto justify-between mb-1 items-end">
            <FlyToToggle />
            <ViewToggle />
        </div>
    )
}
export default ControllerRow