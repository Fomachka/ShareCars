import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../api/apiBookings";
import toast from "react-hot-toast";

const useCheckoutData = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id: number) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => toast.error("There was an error checking out"),
  });

  return { checkOut, isCheckingOut };
};

export default useCheckoutData;
