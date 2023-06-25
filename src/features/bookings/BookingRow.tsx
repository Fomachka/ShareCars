import { HiOutlineInformationCircle } from "react-icons/hi2";
import { Booking, Guests, Places } from "./BookingTable";
import { useNavigate } from "react-router-dom";

export const BookingRow = ({ booking }: { booking: Booking }) => {
  const { places, guests }: { places: Places; guests: Guests } = booking;
  const navigate = useNavigate();

  return (
    <div
      className="grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-10 items-center py-6 px-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-gray-100 "
      role="row"
    >
      <p className="text-2xl font-semibold text-gray-600">{places.name}</p>
      <p>{guests.firstName + " " + guests.lastName}</p>
      <p className="font-semibold">{booking.numOfNights} Nights</p>
      <p
        className={`font-medium ${booking.status === "Not Confirmed" && "text-red-600"} ${
          booking.status === "unconfirmed" && "text-yellow-500"
        }`}
      >
        {booking.status}
      </p>
      <div className="">$ {booking.totalPrice}</div>

      <button onClick={() => navigate(`/bookings/${booking.id}`)}>
        <HiOutlineInformationCircle className="w-8 h-full text-gray-600 hover:text-gray-800 " />
      </button>
    </div>
  );
};
