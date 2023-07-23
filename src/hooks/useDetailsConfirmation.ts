import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../api/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface UpdatedBooking {
  status: string;
  extraDetails?: ExtraDetails;
}

export interface ExtraDetails {
  addedGasCard?: true;
  extraPrice?: number;
  totalPrice?: number;
}

const useDetailsConfirmation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading } = useMutation({
    mutationFn: ({ id, extraDetails }: { id: number; extraDetails?: ExtraDetails }) =>
      updateBooking(id, {
        status: "paid",
        ...extraDetails,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} payment successfully confirmed`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate(`/bookings`);
    },

    onError: () => toast.error("There was an error confirming the payment"),
  });

  return { checkIn, isLoading };
};

export default useDetailsConfirmation;
