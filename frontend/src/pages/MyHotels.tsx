import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

const MyHotels = () => {
    const { data: hotelData } = useQuery(
        "fetchMyHotels",
        apiClient.fetchMyHotels,
        {
            onError: () => { },
        }
    );

    if (!hotelData) {
        return <span className="text-slate-700 text-center">No Hotels found</span>;
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold text-slate-700">My Hotels</h1>
                <Link
                    to="/add-hotel"
                    className="flex bg-rose-700 text-white text-md font-semibold rounded-sm p-2 hover:bg-rose-600"
                >
                    Add Hotel
                </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {hotelData?.map((hotel) => (
                    <div
                        data-testid="hotel-card"
                        className="bg-rose-800 flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
                    >
                        <h2 className="text-2xl font-semibold text-white">{hotel.name}</h2>
                        <div className="whitespace-pre-line text-white">{hotel.description}</div>
                        <div className="grid grid-cols-5 gap-2 text-white">
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                {hotel.type}
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                {hotel.facilities}
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">

                                {hotel.starRating} Star Rating
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link
                                to={`/edit-hotel/${hotel._id}`}
                                className="flex bg-white text-rose-700 text-md font-semibold p-2 hover:bg-gray-100 rounded-sm border-none"
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;