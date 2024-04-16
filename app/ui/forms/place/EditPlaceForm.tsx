'use client'

import Link from "next/link"
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { updatePlace } from "@/app/lib/placeActions";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { Place } from "@/app/lib/definitions";
import EmojiPickerComponent from "../form-components/EmojiPickerComponent";
import CategoryDropdown from "../form-components/CategoryDropdown";
import DescriptionInput from "../form-components/DescriptionInput";
import NameInput from "../form-components/NameInput";

const EditPlaceForm = ({ place, backUrl }: { place: Place, backUrl: string }) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState(place.emoji);
    const inputRef = useRef<HTMLInputElement>(null);

    const searchParams = useSearchParams();
    const params = useParams();
    const viewState = searchParams.get('viewstate') ?? '15,20,1.5';
    const map_id = params.id;

    useEffect(() => { inputRef?.current?.focus() }, [])
    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
    }

    const placeProps = { id: place.id, emoji, map_id: +map_id, viewState }
    const createPlaceWithArguments = updatePlace.bind(null, placeProps);

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createPlaceWithArguments, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>

            <NameInput defaultName={place.name}>
                {state.errors?.name && <p className="text-red-500 text-xs mt-1 font-light block">{state.errors.name[0]}</p>}
            </NameInput>

            <DescriptionInput defaultDescription={place.description}>
                {state.errors?.description && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.description[0]}</p>}
            </DescriptionInput>

            <CategoryDropdown defaultCategory={place.category} />
            {state.errors?.category && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.category[0]}</p>}

            <EmojiPickerComponent emoji={emoji} showEmojiPicker={showEmojiPicker} handleEmojiClick={handleEmojiClick} setShowEmojiPicker={setShowEmojiPicker}>
                {state.errors?.validated_emoji && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_emoji[0]}</p>}
            </EmojiPickerComponent>

            <div className="flex gap-1">
                <Link href={`/maps/${map_id}?${backUrl}`} scroll={false} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</Link>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>
            {state.errors?.validated_map_id && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_map_id[0]}</p>}
        </form >
    )
}
export default EditPlaceForm