'use client'

import Link from "next/link"
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from "react";
import { createMap } from "@/app/lib/mapActions";
import { useFormState } from "react-dom";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const CreateMapForm = () => {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [emoji, setEmoji] = useState('🗺️');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEmojiClick = (pickedEmoji: string) => {
        setEmoji(pickedEmoji);
        setShowEmojiPicker(false);
    }

    useEffect(() => { inputRef?.current?.focus() }, [])
    const createMapWithUserIdAndEmoji = createMap.bind(null, 1, emoji);

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createMapWithUserIdAndEmoji, initialState);

    return (
        <form className="flex flex-col gap-6" action={dispatch}>
            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5">Name</label>
                <input
                    name="mapname"
                    type="text"
                    ref={inputRef}
                    className="border rounded w-full px-2 py-1 text-sm text-gray-700" />
                {state.errors?.name &&
                    <p className="text-red-500 text-xs font-light mt-1">{state.errors.name[0]}</p>
                }
            </div>
            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5">Description</label>
                <textarea
                    maxLength={200}
                    name="mapdescription"
                    rows={5}
                    className="border rounded w-full px-2 py-1 text-sm text-gray-700 resize-none" />
            </div>
            <div className="flex relative items-center">
                <div className={`relative border px-2 py-1 rounded cursor-pointer flex w-min items-center ${showEmojiPicker ? 'border-blue-400' : ''}`} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <p className="font-light text-xs mr-2">Emoji</p>
                    <MagnifyingGlassIcon className="text-xs" />
                </div>
                <EmojiPicker
                    open={showEmojiPicker}
                    width={450}
                    onEmojiClick={(e) => handleEmojiClick(e.emoji)}
                    style={{ position: 'absolute' }}
                    className="border top-9 -left-1" />
                <p className="text-2xl ml-2 cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>{emoji}</p>
                {state.errors?.validated_emoji &&
                    <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.validated_emoji[0]}</p>
                }
            </div>
            <div className="flex gap-1">
                <Link href='/maps' className="bg-white hover:bg-gray-50 border font-medium py-1.5 rounded text-sm w-full text-center">Cancel</Link>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 rounded text-sm w-full">Save</button>
            </div>
            {state.errors?.validated_user_id &&
                <p className="text-red-500 text-xs ml-2 font-light block">Something went wrong. Please sign out and in again.</p>
            }
            {state.message && <p className="text-red-500 text-xs ml-2 font-light block">{state.message}</p>}
        </form >
    )
}
export default CreateMapForm