import FlyToToggle from "./FlyToToggle"
import ViewToggle from "./ViewToggle"

const ControllerRow = () => {
    return (
        <div className="flex w-[90%] mx-auto justify-end mb-1">
            <FlyToToggle />
            <ViewToggle />
        </div>
    )
}
export default ControllerRow