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
  cars: Places;
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
    <table className=" bg-white dark:bg-slate-900 rounded-md overflow-x-auto w-full table-auto">
      <thead>
        <tr className="grid grid-cols-[2fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-20 items-center tracking-wide text-slate-500 dark:text-gray-100  py-6 px-10 text-left m-2 xl:text-reg">
          <th className="min-w-[100px]">Name</th>
          <th className="min-w-[100px]">Model</th>
          <th className="min-w-[100px]">Reservation</th>
          <th className="min-w-[100px]">Amount</th>
          <th className="min-w-[100px]">Status</th>
        </tr>
      </thead>
      <>
        <div className="bg-gray-200/60 dark:bg-gray-200/10 w-full h-0.5"></div>
      </>
      <tbody>
        {bookings?.map((booking, index) => (
          <BookingRow
            key={index}
            index={index}
            booking={booking}
            setCurrentMenu={setCurrentMenu}
            currentMenu={currentMenu}
          />
        ))}
      </tbody>
      {typeof count === "number" && <Pagination numOfResults={count} />}
    </table>
  );
};
