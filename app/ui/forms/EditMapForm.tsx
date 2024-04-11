'use client'

import Link from "next/link"
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from "react";
import { updateMap } from "@/app/lib/mapActions";
import { useFormState } from "react-dom";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type FormProps = {
    defaultName: string,
    defaultDesc: string,
    defaultEmoji: string,
    map_id: string,
}

const EditMapForm = ({ defaultName, defaultDesc, defaultEmoji, map_id }: FormProps) => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState(defaultEmoji);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
    }

    useEffect(() => { inputRef?.current?.focus() }, [])
    const updateMapWithIdAndEmoji = updateMap.bind(null, map_id, '2be0f326-4cc4-4c36-a87e-39b4c8d778d0', emoji);


    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(updateMapWithIdAndEmoji, initialState);
    console.log(state);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>
            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5">Name</label>
                <input
                    name="mapname"
                    defaultValue={defaultName}
                    className="border rounded w-full px-2 py-1 text-sm text-gray-700"
                    type="text"
                    ref={inputRef} />
                {state.errors?.name &&
                    <p className="text-red-500 text-xs font-light mt-1">{state.errors.name[0]}</p>
                }
            </div>
            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5">Description</label>
                <textarea
                    name="mapdescription"
                    defaultValue={defaultDesc}
                    maxLength={200}
                    className="border rounded w-full px-2 py-1 text-sm text-gray-700 resize-none"
                    rows={5} />
            </div>
            <div className="flex relative">
                <div className={`relative border px-2 py-1 rounded cursor-pointer flex w-min items-center ${showEmojiPicker ? 'border-blue-400' : ''}`} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <p className="font-light text-xs mr-2">Emoji</p>
                    <MagnifyingGlassIcon className="text-xs" />
                </div>
                <EmojiPicker
                    open={showEmojiPicker}
                    width={450}
                    onEmojiClick={(e) => handleEmojiClick(e.emoji)}
                    style={{ position: 'absolute' }}
                    className="shadow-lg border -top-40 right-4" />
                <p className="text-2xl ml-2 cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{emoji}</p>
                {state.errors?.validatedEmoji &&
                    <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validatedEmoji[0]}</p>
                }
            </div>
            <div className="flex gap-1">
                <Link href={'/maps/' + map_id} className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</Link>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>
            {state.errors?.validatedUserId &&
                <p className="text-red-500 text-xs ml-2 font-light block">Something went wrong. Please sign out and in again.</p>
            }
            {state.message && <p className="text-red-500 text-xs ml-2 font-light block">{state.message}</p>}
        </form>
    )
}
export default EditMapForm