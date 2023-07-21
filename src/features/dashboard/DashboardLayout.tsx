import { Loading } from "../../ui/Loading";
import DashboardFilter from "./DashboardFilter";
import DurationChart from "./PieChart";
import SalesChart from "./GraphChart";
import Stats from "./HeaderInfo";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import DashboardOverview from "./overview/DashboardOverview";

export interface BookingStats {
  created_at: Date;
  totalPrice: number;
  extraPrice: number;
}

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  const { renters, paidRenters, isLoading: isLoadingStays, numDays } = useRecentStays();
  console.log(renters && renters);

  if (isLoading || isLoadingStays) return <Loading />;

  return (
    <div>
      <DashboardFilter />
      {bookings && renters && <Stats bookings={bookings} renters={renters} />}
      <section className="flex gap-x-6 w-full flex-wrap">
        <DashboardOverview />
        {renters && <DurationChart renters={renters} />}
      </section>
      {bookings && <SalesChart bookings={bookings} numOfDays={numDays} />}
    </div>
  );
};

export default DashboardLayout;
