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
  guests: { firstName: string; lastName?: string; email?: string };
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

  const { isLoading, data: renters } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["renters", `last-${numDays}`],
  });

  const paidRenters = renters?.filter((renter) => renter.status !== "not-paid");

  return { isLoading, renters, paidRenters, numDays };
};

export default useRecentStays;
