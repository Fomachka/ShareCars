import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../api/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookingsData = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  let numOfPages;

  const filterParams = searchParams.get("status");
  const filter =
    !filterParams || filterParams === "all"
      ? null
      : { value: "status", category: filterParams };

  const filterSelect = searchParams.get("select") || "checkInDate-asc";
  const [sortingType, ascOrDesc] = filterSelect.split("-");
  const sort = { sortingType, ascOrDesc };

  const activePage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, activePage],
    queryFn: () => getBookings({ filter, sort, activePage }),
  });

  if (count) {
    numOfPages = Math.ceil(count / activePage);
  }

  if (numOfPages && activePage < numOfPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, activePage + 1],
      queryFn: () => getBookings({ filter, sort, activePage: activePage + 1 }),
    });
  if (numOfPages && activePage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, activePage - 1],
      queryFn: () => getBookings({ filter, sort, activePage: activePage - 1 }),
    });

  return { isLoading, bookings, error, count };
};

export default useBookingsData;
