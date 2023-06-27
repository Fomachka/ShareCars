import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../api/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface UpdatedBooking {
  status: string;
  isPaid?: boolean;
  breakfast?: Breakfast;
}

export interface Breakfast {
  hasBreakfast?: true;
  extraPrice?: number;
  totalPrice?: number;
}

const useCheckinData = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading } = useMutation({
    mutationFn: ({ id, breakfast }: { id: number; breakfast: Breakfast }) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate(`/bookings/${data.id}`);
    },

    onError: () => toast.error("There was an error checking in"),
  });

  return { checkIn, isLoading };
};

export default useCheckinData;
