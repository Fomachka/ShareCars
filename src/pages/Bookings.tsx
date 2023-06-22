import { BookingTable } from "../features/bookings/BookingTable";
import { Filter } from "../features/places/Filter";

function Bookings() {
  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-gray-700">Bookings</h1>
        <Filter
          currentFilter="status"
          allFilters={[
            { value: "all", category: "All" },
            { value: "checked-out", category: "Checked out" },
            { value: "checked-in", category: "Checked in" },
            { value: "unconfirmed", category: "Unconfirmed" },
          ]}
          allSorting={[
            { value: "checkInDate-desc", category: "Sort by date (recent first)" },
            { value: "checkInDate-asc", category: "Sort by date (earlier first)" },
            {
              value: "totalPrice-desc",
              category: "Sort by amount (high first)",
            },
            { value: "totalPrice-asc", category: "Sort by amount (low first)" },
          ]}
        />
      </header>
      <section>
        <BookingTable />
      </section>
    </>
  );
}

export default Bookings;
