import { HotelType } from "../../../backend/src/shared/types";

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType;
}

const BookingDetailSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
    return (
        <div className="grid gap-4 border border-slate-300 p-5 h-fit">
            <h2 className="text-xl  font-medium text-slate-700">Your Booking Details:</h2>
            <div className="border-b py-2">
                Location:
                <div className="font-medium text-slate-700">
                    {` ${hotel.name}, ${hotel.city}, ${hotel.country}`}
                </div>
                <div className="flex justify-between">
                    <div>
                        Check-in
                        <div className="font-medium text-slate-700"> {checkIn.toDateString()}</div>
                    </div>
                    <div>
                        Check-Out
                        <div className="font-medium text-slate-700"> {checkOut.toDateString()}</div>
                    </div>
                </div>
                <div className="border-t border-b py-2">
                    Total length of stay:
                    <div className="font-medium text-slate-700">
                        {numberOfNights} nights
                    </div>
                </div>
                <div>
                    Guests{" "}
                    <div className="font-medium text-slate-700">
                        {adultCount} adults & {childCount} children
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDetailSummary;