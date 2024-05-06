import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors }} = useFormContext<HotelFormData>();
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            const filteredFiles = newFiles.filter(newFile => {
                return !uploadedFiles.some(existingFile => existingFile.name === newFile.name);
            });
            setUploadedFiles(prevFiles => [...prevFiles, ...filteredFiles]);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold text-slate-700 mb-3">Attached Images</h2>
            <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                <div className="w-full md:w-1/3">
                    <label className="cursor-pointer bg-rose-800 rounded-md p-4 shadow-sm text-lg text-white hover:bg-rose-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 flex items-center">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            {...register("imageFiles", {
                                onChange: handleFileChange,
                                validate: (imageFiles) => {
                                    const totalLength = imageFiles.length;
                                    if (totalLength === 0) {
                                        return "At least one image must be added.";
                                    } if (totalLength > 6) {
                                        return "Total number of images must not exceed six.";
                                    }
                                    return true;
                                }
                            })}
                        />
                        <span className="mr-2">Add</span>
                        <img src="/upload.png" alt="Upload Icon" className="w-4" />
                    </label>
                </div>
                <div className="w-full md:w-2/3">
                    {uploadedFiles.length > 0 && (
                        <div className="text-sm text-rose-800">
                            {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ''} selected:
                            <ul className="pl-5">
                                {uploadedFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {errors.imageFiles && (
                <span className="text-red-600 text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </div>
    );
};

export default ImagesSection;
