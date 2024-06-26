import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsFilteredByDate } from "../../../api/apiBookings";

const useFilteredBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsFilteredByDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
};

export default useFilteredBookings;
