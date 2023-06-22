import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookingsData = () => {
  const [searchParams] = useSearchParams();

  const filterParams = searchParams.get("status");
  const filter =
    !filterParams || filterParams === "all"
      ? null
      : { value: "status", category: filterParams };

  const filterSelect = searchParams.get("select") || "checkInDate-asc";
  const [sortingType, ascOrDesc] = filterSelect.split("-");
  const sort = { sortingType, ascOrDesc };

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });

  if (data !== undefined) {
    const { data: bookings, count } = data;
    return { isLoading, bookings, error, count };
  }
  return { isLoading, data, error };
};

export default useBookingsData;
