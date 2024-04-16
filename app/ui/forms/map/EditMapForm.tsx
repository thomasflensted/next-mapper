'use client'

import { useState } from "react";
import { updateMap } from "@/app/lib/mapActions";
import { useFormState } from "react-dom";
import NameInput from "../form-components/NameInput";
import DescriptionInput from "../form-components/DescriptionInput";
import EmojiPickerComponent from "../form-components/EmojiPickerComponent";
import { useRouter } from "next/navigation";

type FormProps = {
    defaultName: string,
    defaultDesc: string,
    defaultEmoji: string,
    map_id: string,
}

const EditMapForm = ({ defaultName, defaultDesc, defaultEmoji, map_id }: FormProps) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState(defaultEmoji);
    const router = useRouter();

    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
    }

    const updateMapWithIdAndEmoji = updateMap.bind(null, +map_id, 1, emoji);
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(updateMapWithIdAndEmoji, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>

            <NameInput defaultName={defaultName}>
                {state.errors?.name && <p className="text-red-500 text-xs font-light mt-1">{state.errors.name[0]}</p>}
            </NameInput>

            <DescriptionInput defaultDescription={defaultDesc}>
                {state.errors?.description && <p className="text-red-500 text-xs font-light mt-1">{state.errors.description[0]}</p>}
            </DescriptionInput>

            <EmojiPickerComponent emoji={emoji} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} handleEmojiClick={handleEmojiClick}>
                {state.errors?.validated_emoji && <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_emoji[0]}</p>}
            </EmojiPickerComponent>

            <div className="flex gap-1">
                <button type="reset" onClick={() => router.back()} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>

            {state.errors?.validated_user_id && <p className="text-red-500 text-xs ml-2 font-light block">Something went wrong. Please sign out and in again.</p>}
            {state.message && <p className="text-red-500 text-xs ml-2 font-light block">{state.message}</p>}

        </form>
    )
}
export default EditMapForm