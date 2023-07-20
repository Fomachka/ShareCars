import { Loading } from "../../ui/Loading";
import DashboardFilter from "./DashboardFilter";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";

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
      <section className="flex gap-6 w-full">
        {renters && <DurationChart renters={renters} numOfDays={numDays} />}
        {renters && <DurationChart renters={renters} numOfDays={numDays} />}
      </section>
      {bookings && <SalesChart bookings={bookings} numOfDays={numDays} />}
    </div>
  );
};

export default DashboardLayout;
