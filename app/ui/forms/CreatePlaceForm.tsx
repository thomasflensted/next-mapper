'use client'

import Link from "next/link"
import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { createPlace } from "@/app/lib/placeActions";
import { useSearchParams, useParams } from "next/navigation";

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

            <div className="flex flex-col">
                <label className="block font-light text-xs mb-0.5">Name</label>
                <input
                    name="placename"
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
                    name="placedescription"
                    rows={4}
                    className="border rounded w-full px-2 py-1 text-sm text-gray-700 resize-none" />
            </div>

            <select className="bg-white border rounded w-min px-2 py-1 text-xs" name="placecategory">
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Café</option>
                <option value="museum">Museum</option>
                <option value="nature">Nature</option>
                <option value="sight">Sight</option>
                <option value="accommodation">Accommodation</option>
                <option value="memory">Memory</option>
                <option value="other">Other</option>
            </select>
            {state.errors?.category &&
                <p className="text-red-500 text-xs ml-2 font-light block">{state.errors.category[0]}</p>
            }

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