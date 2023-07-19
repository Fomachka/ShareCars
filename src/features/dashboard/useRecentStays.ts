import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../api/apiBookings";

export interface BookingFull {
  addedGasCard: boolean;
  bookingId: number;
  carPrice: number;
  checkInDate: Date;
  checkOutDate: Date;
  created_at: Date;
  extraPrice: number;
  guestId: number;
  guests: { firstName: string };
  id: number;
  numOfNights: number;
  placeId: number;
  status: string;
  totalPrice: number;
}

const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "paid" || stay.status === "not-paid"
  );

  return { isLoading, stays, confirmedStays, numDays };
};

export default useRecentStays;
