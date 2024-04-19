'use client'

import Link from "next/link"
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { createPlace } from "@/app/data/actions/placeActions";
import { useSearchParams, useParams } from "next/navigation";
import CategoryDropdown from "../form-components/CategoryDropdown";
import EmojiPickerComponent from "../form-components/EmojiPickerComponent";
import DescriptionInput from "../form-components/DescriptionInput";
import NameInput from "../form-components/NameInput";
import { NewPlaceWithoutFormData } from "@/app/data/places";

const CreatePlaceForm = () => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState('⭐');
    const inputRef = useRef<HTMLInputElement>(null);

    const searchParams = useSearchParams();
    const params = useParams();
    const lng = searchParams.get('lng') ?? 0;
    const lat = searchParams.get('lat') ?? 0;
    const viewState = searchParams.get('viewstate') ?? '15,20,1.5';
    const map_id = typeof params.id !== 'string' ? +params.id[0] : +params.id;

    useEffect(() => { inputRef?.current?.focus() }, [])
    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
    }

    const newPlace: NewPlaceWithoutFormData = { lng: lng.toString(), lat: lat.toString(), emoji, map_id }

    const createPlaceWithArguments = createPlace.bind(null, newPlace, viewState);

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createPlaceWithArguments, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>

            <NameInput defaultName="">
                {state.errors?.name && <p className="mt-1 text-xs font-light text-red-500">{state.errors.name[0]}</p>}
            </NameInput>

            <DescriptionInput defaultDescription="">
                {state.errors?.description && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.description[0]}</p>}
            </DescriptionInput>

            <CategoryDropdown defaultCategory="restaurant" />
            {state.errors?.category && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.category[0]}</p>}

            <EmojiPickerComponent emoji={emoji} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} handleEmojiClick={handleEmojiClick}>
                {state.errors?.validated_emoji && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.validated_emoji[0]}</p>}
            </EmojiPickerComponent>

            <div className="flex gap-1">
                <Link href={'/maps/' + map_id + '?viewstate=' + viewState} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</Link>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>

            {state.errors?.validated_map_id && <p className="block ml-2 text-xs font-light text-red-500">Something went wrong. Please refresh the page.</p>}
            {state.errors?.validated_lat && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.validated_lat[0]}</p>}
            {state.errors?.validated_lng && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.validated_lng[0]}</p>}
            {state.errors?.validated_lng && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.validated_lng[0]}</p>}
        </form >
    )
}
export default CreatePlaceForm