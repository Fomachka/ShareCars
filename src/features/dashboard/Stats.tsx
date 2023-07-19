import Stat from "./Stat";
import { BookingStats } from "./DashboardLayout";
import { BookingFull } from "./useRecentStays";
import { MdCalendarToday, MdCarRental, MdMonetizationOn, MdPeople } from "react-icons/md";

function Stats({
  bookings,
  confirmedStays,
}: {
  bookings: BookingStats[];
  confirmedStays: BookingFull[];
}) {
  const numBookings = bookings?.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const activeRenters = confirmedStays.length;

  const averageNumOfNights = (
    confirmedStays.reduce((acc, cur) => acc + cur.numOfNights, 0) / numBookings
  ).toFixed(1);

  return (
    <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 gap-6 w-full mb-8">
      <Stat
        title="Bookings"
        icon={<MdCalendarToday className="w-6 h-6" />}
        value={numBookings}
        ending="active bookings"
        color="#2563eb"
      />
      <Stat
        title="Sales"
        icon={<MdMonetizationOn className="w-6 h-6" />}
        value={sales}
        ending="earned"
        color="#22c55e"
      />
      <Stat
        title="Confirmed Renters"
        icon={<MdPeople className="w-6 h-6" />}
        value={activeRenters}
        ending="confirmed payments"
        color="#14b8a6"
      />
      <Stat
        title="Days rented"
        icon={<MdCarRental className="w-6 h-6" />}
        value={+averageNumOfNights}
        ending="days / person"
        color="#eab308"
      />
    </div>
  );
}

export default Stats;
