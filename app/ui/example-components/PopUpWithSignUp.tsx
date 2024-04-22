import Link from "next/link"
import { Popup } from "react-map-gl"

const PopUpWithSignUp = ({ lat, lng }: { lat: number, lng: number }) => {
    return (
        <Popup
            offset={8}
            key={lat + lng}
            longitude={lng}
            latitude={lat}
            maxWidth='200'
            closeButton={false}>
            <div className='px-2'>
                <Link href='/api/auth/signin'>
                    <h3 className="mb-1 font-medium text-blue-600">Want To Save A Memory Here?</h3>
                    <button className='w-full px-4 py-2 mt-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'>
                        Sign Up
                    </button>
                </Link>
            </div>
        </Popup >
    )
}
export default PopUpWithSignUp