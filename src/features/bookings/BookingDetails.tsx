import { HiOutlineHomeModern } from "react-icons/hi2";
import useBooking from "../../hooks/useSingleBooking";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "../../utils/helpers";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useNavigate } from "react-router-dom";
import useCheckoutData from "../../hooks/useCheckoutData";
import { useState } from "react";
import DeleteModal from "../../ui/modals/DeleteModal";
import useDeleteBooking from "./hooks/useDeleteBooking";

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckoutData();
  const [showModal, setShowModal] = useState(false);
  // const navigateBack = useNavigateBack();
  console.log(booking);
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: deleteBooking } = useDeleteBooking();

  // const { isLoading, mutate } = useMutation({
  //   mutationFn: (id: number) => deleteBooking(id),
  //   onSuccess: () => {
  //     toast.success("Successfully deleted booking");
  //     queryClient.invalidateQueries({
  //       queryKey: ["bookings"],
  //     });
  //   },
  //   onError: (err: Error) => toast.error(err.message),
  // });

  const handleDeleteModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="space-y-8">
      <header className="flex gap-8">
        <h1>Booking #{booking?.id}</h1>
        <p className="text-lg py-2 px-3 bg-blue-400 rounded-md">{booking?.status}</p>
      </header>
      <section>
        <div className="bg-blue-400 py-6 px-8 text-white rounded-md flex justify-between items-center">
          <div className="flex gap-8">
            <HiOutlineHomeModern />
            <p className="text-2xl">
              {booking?.numOfNights} in place {booking?.places?.name}
            </p>
          </div>
          {booking && (
            <p className="text-xl">
              {format(new Date(booking?.checkInDate), "EEE, MMM dd yyyy")} (
              {isToday(new Date(booking?.checkInDate))
                ? "Today"
                : formatDistanceFromNow(booking?.checkInDate)}
              ) &mdash; {format(new Date(booking?.checkOutDate), "EEE, MMM dd yyyy")}
            </p>
          )}
        </div>
        <div className="bg-white h-[500px] rounded-b-md py-8 px-10 text-xl space-y-8">
          <p className="">
            {booking?.guests?.firstName + " " + booking?.guests?.lastName} +{" "}
            {booking?.numOfGuests - 1} guests
          </p>
          <p className="">
            Email : <span className="text-gray-500">{booking?.guests?.email}</span>
          </p>
          <div>
            <span className="font-medium">Breakfast Included?</span>{" "}
            {booking?.hasBreakfast ? "Yes" : "No"}
          </div>
          <p>
            Total price: ${booking?.totalPrice}{" "}
            {booking?.hasBreakfast && " (with breakfast)"}
          </p>
          <p>Status: {booking?.isPaid ? "Paid" : "Will pay at property"}</p>
          <footer>
            {booking && (
              <p>
                Booked on {format(new Date(booking?.checkInDate), "EEE, MMM dd yyyy, p")}
              </p>
            )}
          </footer>
        </div>
        {booking?.status !== "checked-in" && booking?.status !== "checked-out" && (
          <button
            className="text-xl py-2 px-4 bg-blue-400 rounded-md text-white"
            onClick={() => navigate(`/checkin/${booking?.id}`)}
          >
            Check In
          </button>
        )}
        {booking?.status !== "checked-out" && booking?.status !== "unconfirmed" && (
          <button
            className="text-xl py-2 px-4 bg-blue-400 rounded-md text-white"
            onClick={() => checkOut(booking?.id)}
          >
            Check Out
          </button>
        )}
        {booking?.status !== "unconfirmed" && (
          <button
            className="text-xl py-2 px-4 bg-red-400 rounded-md text-white"
            onClick={handleDeleteModal}
            disabled={isDeleting}
          >
            Delete Booking
          </button>
        )}
        {showModal && (
          <DeleteModal
            closeModal={() => setShowModal(false)}
            deleteConfirmation={() => {
              if (booking.id) deleteBooking(booking.id);
            }}
            deleteMessage="Are you sure you want to delete this booking?"
            navigateTo={() => navigate("/bookings")}
          />
        )}
        {/* <button onClick={navigateBack}>Back</button> */}
      </section>
    </div>
  );
}

export default BookingDetail;