import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../api/apiBookings";
import toast from "react-hot-toast";

const usePaymentConfirmation = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id: number) =>
      updateBooking(id, {
        status: "paid",
      }),
    onSuccess: (data) => {
      toast.success(`Payment for reservation #${data.id} successfully confirmed `);
      queryClient.invalidateQueries({ queryKey: ["booking", `${data.id}`] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => toast.error("There was an error confirming the payment"),
  });

  return { checkOut, isCheckingOut };
};

export default usePaymentConfirmation;
