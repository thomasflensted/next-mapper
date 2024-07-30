import { ReactNode, useRef, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { IoIosCloseCircle } from "react-icons/io";

const ImageInput = ({ children }: { children: ReactNode }) => {

    const [images, setImages] = useState<(string | null)[]>(Array(5).fill(null));
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (files: FileList | null) => {
        if (!files) return;
        let updatedImages = [...images];
        let count = 0;
        updatedImages.map((image, index) => image === null && files[count]
            ? updatedImages[index] = URL.createObjectURL(files[count++]) : image)
        setImages(updatedImages);
    }

    const handleImageDelete = (index: number) => {
        let updatedImages = [...images].map((_, idx) => idx === index ? null : images[idx]);
        updatedImages = [...updatedImages.filter(image => image !== null), ...updatedImages.filter(image => image === null)];
        setImages(updatedImages)
    }

    return (
        <div className="flex flex-col">
            <div className="flex gap-1 justify-between">
                <input
                    ref={inputRef}
                    onChange={(e) => handleImageSelect(e.target.files)}
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp, image/heic"
                />
                {images.map((image, index) => {
                    return image
                        ? <div key={index} className="relative flex-1 basis-0 h-16 border rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <IoIosCloseCircle onClick={() => handleImageDelete(index)} className="absolute top-0 right-0 text-black shadow cursor-pointer" />
                            <img src={image} className="object-cover w-full h-full" alt="image" />
                        </div>
                        : <div
                            key={index}
                            onClick={() => inputRef.current?.click()}
                            className="group flex-1 basis-0 h-16 border rounded flex items-center justify-center flex-shrink-0">
                            <FaPlus className="text-gray-400 group-hover:text-gray-900 group-hover:scale-125 transition-all" />
                        </div>
                })}
            </div>
            {children}
        </div>
    )
}
export default ImageInput