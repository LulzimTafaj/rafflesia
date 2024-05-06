import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
    <div>
        <h2 className="text-2xl font-semibold mb-3 text-slate-700">Number of Guests</h2>
        <div className="grid grid-cols-2 gap-5 bg-rose-800 p-6 rounded-md">
            <label className="text-white text-md font-semibold mb-1 gap-1">
                Adult Count:
                <input type="number" min={1} className="text-rose-800 rounded w-full py-2 px-3 font-normal" {...register("adultCount", {
                    required: "This field is required.",
                })} />
            {errors.adultCount?.message && (
                <span className="text-white text-sm font-bold">{errors.adultCount.message}</span>
            )}
            </label>
            <label className="text-white text-md font-semibold mb-1 gap-1">
                Children Count:
                <input type="number" min={1} className="text-rose-800 rounded w-full py-2 px-3 font-normal" {...register("childCount", {
                    required: "This field is required.",
                })} />
            {errors.childCount?.message && (
                <span className="text-white text-sm font-bold">{errors.childCount.message}</span>
            )}
            </label>
        </div>
        </div>
    )
}

export default GuestsSection;