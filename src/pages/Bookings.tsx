import { BookingTable } from "../features/bookings/BookingTable";

function Bookings() {
  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-gray-700">Bookings</h1>
      </header>
      <section>
        <BookingTable />
      </section>
    </>
  );
}

export default Bookings;
