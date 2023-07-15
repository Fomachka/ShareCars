import { BookingTable } from "../features/bookings/BookingTable";
import { Filter } from "../features/cars/Filter";
import Headers from "../ui/headers/Header";
import PageHeader from "../ui/headers/PageHeader";

const Bookings = () => {
  return (
    <main>
      <PageHeader
        header="Reservations"
        paragraph="Check all of the currently active and inactive reservations"
      />
      <section className="relative">
        <Filter
          currentFilter="status"
          allFilters={[
            { value: "all", category: "All" },
            { value: "paid", category: "Paid" },
            { value: "not-paid", category: "Not Paid" },
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
      </section>
      <section className="overflow-x-auto pb-10">
        <BookingTable />
      </section>
    </main>
  );
};

export default Bookings;
