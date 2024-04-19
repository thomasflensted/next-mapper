'use client'

import { useState } from "react";
import { updateMap } from "@/app/data/actions/mapActions";
import { useFormState } from "react-dom";
import NameInput from "../form-components/NameInput";
import DescriptionInput from "../form-components/DescriptionInput";
import EmojiPickerComponent from "../form-components/EmojiPickerComponent";
import { useRouter, useParams, useSearchParams } from "next/navigation";

type FormProps = {
    defaultName: string,
    defaultDesc: string,
    defaultEmoji: string,
}

const EditMapForm = ({ defaultName, defaultDesc, defaultEmoji }: FormProps) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState(defaultEmoji);

    const router = useRouter();
    const p = useParams();
    const sp = useSearchParams();

    const returnSearchParams = new URLSearchParams(sp).toString();
    const map_id = p.id;

    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
        console.log(emoji);
    }

    const updateMapWithIdAndEmoji = updateMap.bind(null, +map_id, emoji, returnSearchParams);
    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(updateMapWithIdAndEmoji, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>

            <NameInput defaultName={defaultName}>
                {state.errors?.name && <p className="mt-1 text-xs font-light text-red-500">{state.errors.name[0]}</p>}
            </NameInput>

            <DescriptionInput defaultDescription={defaultDesc}>
                {state.errors?.description && <p className="mt-1 text-xs font-light text-red-500">{state.errors.description[0]}</p>}
            </DescriptionInput>

            <EmojiPickerComponent emoji={emoji} showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} handleEmojiClick={handleEmojiClick}>
                {state.errors?.validated_emoji && <p className="block ml-2 text-xs font-light text-red-500">{state.errors.validated_emoji[0]}</p>}
            </EmojiPickerComponent>

            <div className="flex gap-1">
                <button type="reset" onClick={() => router.back()} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>

            {state.message && <p className="block ml-2 text-xs font-light text-red-500">{state.message}</p>}

        </form>
    )
}
export default EditMapForm