import { Loading } from "../../ui/Loading";
import DashboardFilter from "./DashboardFilter";
import DurationChart from "./charts/PieChart";
import SalesChart from "./charts/GraphChart";
import HeaderInfo from "./HeaderInfo";
import useFilteredBookings from "./hooks/useFilteredBookings";
import useFilteredUsers from "./hooks/useFilteredUsers";
import DashboardOverview from "./overview/DashboardOverview";

export interface BookingStats {
  created_at: Date;
  totalPrice: number;
  extraPrice: number;
}

const DashboardLayout = () => {
  const { bookings, isLoading } = useFilteredBookings();
  const { renters, isLoading: isLoadingStays, numDays } = useFilteredUsers();

  if (isLoading || isLoadingStays) return <Loading />;

  return (
    <div>
      <DashboardFilter />
      {bookings && renters && <HeaderInfo bookings={bookings} renters={renters} />}
      <section className="flex gap-x-6 w-full flex-wrap">
        <DashboardOverview />
        {renters && <DurationChart renters={renters} />}
      </section>
      {bookings && <SalesChart bookings={bookings} numOfDays={numDays} />}
    </div>
  );
};

export default DashboardLayout;
