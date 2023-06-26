import { useState } from "react";
import useBookingsData from "../../hooks/useBookingsData";
import { Loading } from "../../ui/Loading";
import { Pagination } from "../../ui/Pagination";
import { BookingRow } from "../bookings/BookingRow";

export type Places = {
  name: string;
};
export type Guests = {
  firstName: string;
  lastName: string;
  email: string;
};

export interface Booking {
  id?: number;
  checkInDate: string;
  numOfNights: number;
  numOfGuests: number;
  placePrice: number;
  extraPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  details: string;
  placeId: number;
  guestId: number;
  places: Places;
  guests: Guests;
}

export const BookingTable = () => {
  const { bookings, isLoading, count } = useBookingsData();
  const [currentMenu, setCurrentMenu] = useState(0);

  if (isLoading) return <Loading />;

  if (!bookings?.length) {
    return <div className="text-2xl text-gray-700">No Bookings could be found.</div>;
  }
  return (
    <div
      className="border border-gray-400 text-2xl bg-white rounded-lg overflow-auto"
      role="table"
    >
      <header
        className="grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-10 items-center bg-gray-50 uppercase tracking-wide font-semibold text-gray-600 py-6 px-10 rounded-t-lg"
        role="row"
      >
        <div>Place</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
      </header>
      {bookings?.map((booking, index) => (
        <BookingRow
          key={index}
          index={index}
          booking={booking}
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
        />
      ))}
      {typeof count === "number" && <Pagination numOfResults={count} />}
    </div>
  );
};
