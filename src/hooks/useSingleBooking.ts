import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../api/apiPlaces";
import { getBooking } from "../api/apiBookings";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { id } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(Number(id)),
    retry: false,
  });
  return { isLoading, booking, error };
};

export default useBooking;
