import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../../api/apiBookings";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Successfully deleted booking");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return { isLoading, mutate };
};

export default useDeleteBooking;
