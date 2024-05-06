import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options.config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3 text-slate-700">Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 my-auto">
                {hotelTypes.map((type) => (
                    <label key={type} className={
                        typeWatch === type ? "cursor-pointer bg-rose-800 text-md text-white rounded-md px-4 py-2 font-semibold my-auto flex-grow-1 flex justify-center items-center sm:justify-start sm:px-2 sm:py-2 sm:rounded-md sm:border sm:border-rose-700 sm:border-opacity-30" : "cursor-pointer bg-white border border-rose-700 border-opacity-30 text-rose-800 rounded-md px-4 py-2 font-semibold text-md flex-grow-1 flex justify-center items-center sm:justify-start sm:px-2 sm:py-2 sm:rounded-md sm:border sm:border-rose-700 sm:border-opacity-30"
                    }>
                        <input className="hidden" type="radio" value={type} {...register("type", {
                            required: "This is required."
                        })} /> 
                        <span className="truncate text-center mx-auto">{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-600 text-sm font-bold">{errors.type.message}</span>
            )}
        </div>
    )
}

export default TypeSection;
