import { Booking, Guests, Places } from "./BookingTable";

export const BookingRow = ({ booking }: { booking: Booking }) => {
  const { places, guests }: { places: Places; guests: Guests } = booking;

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
    </div>
  );
};
