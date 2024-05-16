'use client'

import Link from "next/link"
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { updatePlace } from "@/app/data/actions/placeActions";
import { useSearchParams, useParams } from "next/navigation";
import EmojiPickerComponent from "../form-components/EmojiPickerComponent";
import CategoryDropdown from "../form-components/CategoryDropdown";
import DescriptionInput from "../form-components/DescriptionInput";
import NameInput from "../form-components/NameInput";
import { Place, UpdatePlaceWithoutFormData } from "@/app/data/places";
import SubmitMapBtn from "../form-components/SubmitMapBtn";

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

    const placeProps: UpdatePlaceWithoutFormData = { id: place.id, emoji, map_id: +map_id }
    const createPlaceWithArguments = updatePlace.bind(null, placeProps, viewState);

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createPlaceWithArguments, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>

            <NameInput defaultName={place.name}>
                {state.errors?.name && <p className="block mt-1 text-xs font-light text-red-500">{state.errors.name[0]}</p>}
            </NameInput>

            <DescriptionInput defaultDescription={place.description}>
                {state.errors?.description && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.description[0]}</p>}
            </DescriptionInput>

            <CategoryDropdown defaultCategory={place.category} />
            {state.errors?.category && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.category[0]}</p>}

            <EmojiPickerComponent emoji={emoji} showEmojiPicker={showEmojiPicker} handleEmojiClick={handleEmojiClick} setShowEmojiPicker={setShowEmojiPicker}>
                {state.errors?.validated_emoji && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.validated_emoji[0]}</p>}
            </EmojiPickerComponent>

            <div className="flex gap-1">
                <Link href={`/maps/${map_id}?${backUrl}`} scroll={false} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</Link>
                <SubmitMapBtn />
            </div>

            {state.errors?.validated_map_id && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.validated_map_id[0]}</p>}
        </form >
    )
}
export default EditPlaceForm