import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/apiBookings";

const useBookingsData = () => {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { isLoading, bookings, error };
};

export default useBookingsData;
