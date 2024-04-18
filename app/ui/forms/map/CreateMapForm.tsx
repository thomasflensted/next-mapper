'use client'

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createMap } from "@/app/lib/actions/mapActions";
import { useFormState } from "react-dom";
import NameInput from "../form-components/NameInput";
import DescriptionInput from "../form-components/DescriptionInput";
import EmojiPickerComponent from "../form-components/EmojiPickerComponent";

const CreateMapForm = () => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState('🗺️');
    const router = useRouter();

    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
    }

    const createMapWithUserIdAndEmoji = createMap.bind(null, 1, emoji);
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createMapWithUserIdAndEmoji, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>

            <NameInput defaultName="">
                {state.errors?.name && <p className="text-red-500 text-xs font-light mt-1">{state.errors.name[0]}</p>}
            </NameInput>

            <DescriptionInput defaultDescription="">
                {state.errors?.description && <p className="text-red-500 text-xs font-light mt-1">{state.errors.description[0]}</p>}
            </DescriptionInput>

            <EmojiPickerComponent emoji={emoji} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} handleEmojiClick={handleEmojiClick}>
                {state.errors?.validated_emoji && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_emoji[0]}</p>}
            </EmojiPickerComponent>

            <div className="flex gap-1">
                <button onClick={() => router.back()} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>

            {state.errors?.validated_user_id && <p className="text-red-500 text-xs ml-2 font-light block">Something went wrong. Please sign out and in again.</p>}
            {state.message && <p className="text-red-500 text-xs ml-2 font-light block">{state.message}</p>}
        </form >
    )
}
export default CreateMapForm