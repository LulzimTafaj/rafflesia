import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options.config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const { register, formState: { errors }} = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-700 mb-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelFacilities.map((facility) => (
                    <label key={facility} className="text-md text-rose-800 font-semibold flex gap-1 my-auto">
                        <input type="checkbox" value={facility} className="mr-1" {...register("facilities", {
                            validate: (facilities) => {
                                if (facilities && facilities.length > 0) {
                                    return true
                                } else {
                                    return "At least one facility is required.";
                                }
                            }
                        })}/>
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-600 text-sm font-bold">{errors.facilities.message}</span>
            )}
        </div>
    )
}

export default FacilitiesSection;