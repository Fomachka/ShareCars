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
  id: number;
  checkInDate: string;
  checkOutDate: string;
  numOfNights: number;
  placePrice: number;
  extraPrice: number;
  totalPrice: number;
  status: string;
  addedGasCard: boolean;
  placeId: number;
  guestId: number;
  cars: Places;
  guests?: Guests;
}

export const BookingTable = () => {
  const { bookings, isLoading, count } = useBookingsData();
  const [currentMenu, setCurrentMenu] = useState(0);

  if (isLoading) return <Loading />;

  if (!bookings?.length) {
    return (
      <div className="text-slate-700 dark:text-gray-200 text-xl xl:text-2xl">
        No Bookings could be found.
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-slate-900 rounded-md overflow-x-auto w-full table-auto table shadow-sm">
      <div className="table-header-group">
        <div className="grid grid-cols-[2fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-20 items-center tracking-wide text-slate-500 dark:text-gray-100  py-6 px-10 text-left m-2 xl:text-reg">
          <p className="min-w-[100px] table-cell">Name</p>
          <p className="min-w-[100px] table-cell">Model</p>
          <p className="min-w-[200px] table-cell">Reservation</p>
          <p className="min-w-[100px] table-cell">Amount</p>
          <p className="min-w-[100px] table-cell">Status</p>
        </div>
      </div>
      <>
        <div className="bg-gray-200/60 dark:bg-gray-200/10 w-full h-0.5"></div>
      </>
      <div className="table-row-group">
        {bookings?.map((booking, index) => (
          <BookingRow
            key={index}
            index={index}
            booking={booking}
            setCurrentMenu={setCurrentMenu}
            currentMenu={currentMenu}
          />
        ))}
      </div>
      {typeof count === "number" && <Pagination numOfResults={count} />}
    </div>
  );
};
