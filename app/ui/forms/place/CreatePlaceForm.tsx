'use client'

import Link from "next/link"
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { createPlace } from "@/app/lib/actions/placeActions";
import { useSearchParams, useParams } from "next/navigation";
import CategoryDropdown from "../form-components/CategoryDropdown";
import EmojiPickerComponent from "../form-components/EmojiPickerComponent";
import DescriptionInput from "../form-components/DescriptionInput";
import NameInput from "../form-components/NameInput";

const CreatePlaceForm = () => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState('⭐');
    const inputRef = useRef<HTMLInputElement>(null);

    const searchParams = useSearchParams();
    const params = useParams();
    const lng = searchParams.get('lng') ?? 0;
    const lat = searchParams.get('lat') ?? 0;
    const viewState = searchParams.get('viewstate') ?? '15,20,1.5';
    const map_id = params.id;

    useEffect(() => { inputRef?.current?.focus() }, [])
    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
    }

    const placeProps = { emoji, lat: +lat, lng: +lng, map_id: +map_id, viewState }
    const createPlaceWithArguments = createPlace.bind(null, placeProps);

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createPlaceWithArguments, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>

            <NameInput defaultName="">
                {state.errors?.name && <p className="text-red-500 text-xs font-light mt-1">{state.errors.name[0]}</p>}
            </NameInput>

            <DescriptionInput defaultDescription="">
                {state.errors?.description && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.description[0]}</p>}
            </DescriptionInput>

            <CategoryDropdown defaultCategory="restaurant" />
            {state.errors?.category && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.category[0]}</p>}

            <EmojiPickerComponent emoji={emoji} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} handleEmojiClick={handleEmojiClick}>
                {state.errors?.validated_emoji && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_emoji[0]}</p>}
            </EmojiPickerComponent>

            <div className="flex gap-1">
                <Link href={'/maps/' + map_id + '?viewstate=' + viewState} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</Link>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>

            {state.errors?.validated_map_id && <p className="text-red-500 text-xs ml-2 font-light block">Something went wrong. Please refresh the page.</p>}
            {state.errors?.validated_lat && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_lat[0]}</p>}
            {state.errors?.validated_lng && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_lng[0]}</p>}
            {state.errors?.validated_lng && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_lng[0]}</p>}
        </form >
    )
}
export default CreatePlaceForm