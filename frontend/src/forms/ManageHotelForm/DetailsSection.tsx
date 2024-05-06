import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {

    const generateStarRating = (rating : number) => {
        let stars = '';
        for (let i = 0; i < rating; i++) {
            stars += '★';
        }
        return stars;
    };

    const { register, formState: { errors }} = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3 text-rose-700">Add Hotel</h1>
            <label className="text-slate-700 text-md font-semibold flex-1">
                Name
                <input className="text-rose-800 border rounded w-full py-1 px-2 font-medium" {...register("name", { required: "This field is required!" })}></input>
                {errors.name && (
                        <span className="text-red-600 text-sm">
                            {errors.name.message}
                        </span>
                    )}
            </label>
            <div className="flex gap-4">
            <label className="text-slate-700 text-md font-semibold flex-1">
                City
                <input className="text-rose-800 border rounded w-full py-1 px-2 font-medium" {...register("city", { required: "This field is required!" })}></input>
                {errors.city && (
                        <span className="text-red-600 text-sm">
                            {errors.city.message}
                        </span>
                    )}
            </label>
            <label className="text-slate-700 text-md font-semibold flex-1">
                Country
                <input className="text-rose-800 border rounded w-full py-1 px-2 font-medium" {...register("country", { required: "This field is required!" })}></input>
                {errors.country && (
                        <span className="text-red-600 text-sm">
                            {errors.country.message}
                        </span>
                    )}
            </label>
            </div>
            <label className="text-slate-700 text-md font-semibold flex-1">
                Description
                <textarea 
                    rows={10}
                    className="font-medium text-rose-800 border rounded w-full py-1 px-2" {...register("description", { required: "This field is required!" })}></textarea>
                {errors.description && (
                        <span className="text-red-600 text-sm">
                            {errors.description.message}
                        </span>
                    )}
            </label>
            <div className="flex gap-4">
                <label className="text-slate-700 text-md font-semibold w-full">
                Price Per Night
                <input type="number" 
                    min={1}
                    className="text-rose-800 font-medium border rounded w-full py-1 px-2" {...register("pricePerNight", { required: "This field is required!" })}></input>
                {errors.pricePerNight && (
                        <span className="text-red-600 text-sm">
                            {errors.pricePerNight.message}
                        </span>
                    )}
            </label>
            <label className="text-slate-700 text-md font-semibold w-full">
                Star Rating
                <select {...register("starRating", {
                    required: "This field is required."
                })} className="border rounded w-full p-2 text-rose-800 font-medium">
                    <option value="" className="text-sm font-semibold">
                        Select as Rating:
                    </option>
                    {[1,2,3,4,5].map((num) => (
                        <option value={num}> {generateStarRating(num)}</option>
                    ))}
                </select>
                {errors.starRating && (
                        <span className="text-red-600 text-sm">
                            {errors.starRating.message}
                        </span>
                    )}
            </label>
            </div>

        </div>
    )
} 

export default DetailsSection;