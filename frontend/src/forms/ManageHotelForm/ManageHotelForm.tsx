import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection.tsx";
import TypeSection from "./TypeSection.tsx";
import FacilitiesSection from "./FacilitiesSection.tsx";
import GuestsSection from "./GuestsSection.tsx";
import ImagesSection from "./ImagesSection.tsx";


export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: string[];
    adultCount: number;
    childCount: number; 
}

type Props = {
    onSave: (hotelFormData: FormData) => void,
    isLoading: boolean
}

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        formData.append( "name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        
        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

        onSave(formData);
        console.log(formData);
    });

    return(
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
            <span className="flex justify-end">
                <button 
                    disabled={isLoading} 
                    type="submit" 
                    className="bg-rose-800 text-white p-2 font-semibold hover:bg-rose-700 text-md rounded-sm disabled:bg-gray-400">
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </span>
        </form>
        </FormProvider>)
}

export default ManageHotelForm;