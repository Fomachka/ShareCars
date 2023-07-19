import { Loading } from "../../ui/Loading";
import DashboardFilter from "./DashboardFilter";
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
  const { stays, confirmedStays, isLoading: isLoadingStays, numDays } = useRecentStays();
  console.log(confirmedStays);

  if (isLoading || isLoadingStays) return <Loading />;

  return (
    <div>
      <DashboardFilter />
      {bookings && confirmedStays && (
        <Stats bookings={bookings} confirmedStays={confirmedStays} />
      )}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_34rem_auto] gap-10 overflow-auto">
        <div>Statistics</div>
        <div>Today&apos;s activity</div>
        <div>Chart Stay duration</div>
        <div>Chart of sales</div>
      </div>
      {bookings && <SalesChart bookings={bookings} numOfDays={numDays} />}
    </div>
  );
};

export default DashboardLayout;
