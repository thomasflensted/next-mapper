import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { ReactNode } from "react"

type Props = {
    children: ReactNode,
    emoji: string,
    showEmojiPicker: boolean,
    setShowEmojiPicker: (showEmojiPicker: boolean) => void,
    handleEmojiClick: (e: string) => void,
}

const EmojiPickerComponent = ({ children, emoji, showEmojiPicker, setShowEmojiPicker, handleEmojiClick }: Props) => {
    return (
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
            {children}
        </div>
    )
}
export default EmojiPickerComponent