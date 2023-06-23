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

  const activePage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sort, activePage],
    queryFn: () => getBookings({ filter, sort, activePage }),
  });

  if (data !== undefined) {
    const { data: bookings, count } = data;
    return { isLoading, bookings, error, count };
  }
  return { isLoading, data, error };
};

export default useBookingsData;
