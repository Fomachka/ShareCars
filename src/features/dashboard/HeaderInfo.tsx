import { BookingStats } from "./DashboardLayout";
import { BookingFull } from "./useRecentStays";
import { MdCalendarToday, MdCarRental, MdMonetizationOn, MdPeople } from "react-icons/md";
import SingleInfo from "./SingleInfo";

const HeaderInfo = ({
  bookings,
  renters,
}: {
  bookings: BookingStats[];
  renters: BookingFull[];
}) => {
  const numOfBookings = bookings?.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const activeRenters = renters.length;

  const averageNumOfNights = (
    renters.reduce((acc, cur) => acc + cur.numOfNights, 0) / numOfBookings
  ).toFixed(1);

  return (
    <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 gap-6 w-full mb-8">
      <SingleInfo
        title="Bookings"
        icon={<MdCalendarToday className="w-6 h-6" />}
        value={numOfBookings}
        ending="active bookings"
        color="#2563eb"
      />
      <SingleInfo
        title="Sales"
        icon={<MdMonetizationOn className="w-6 h-6" />}
        value={sales}
        ending="earned"
        color="#22c55e"
      />
      <SingleInfo
        title="Currently Renting"
        icon={<MdPeople className="w-6 h-6" />}
        value={activeRenters}
        ending="active renters"
        color="#14b8a6"
      />
      <SingleInfo
        title="Days rented"
        icon={<MdCarRental className="w-6 h-6" />}
        value={+averageNumOfNights}
        ending="days / person"
        color="#eab308"
      />
    </div>
  );
};

export default HeaderInfo;
