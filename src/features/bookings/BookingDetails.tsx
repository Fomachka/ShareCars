import { HiOutlineHomeModern } from "react-icons/hi2";
import useBooking from "../../hooks/useSingleBooking";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useNavigate } from "react-router-dom";
import useCheckoutData from "../../hooks/useCheckoutData";
import { useState } from "react";
import DeleteModal from "../../ui/modals/DeleteModal";
import useDeleteBooking from "./hooks/useDeleteBooking";
import PageHeader from "../../ui/headers/PageHeader";
import { MdAccessTimeFilled, MdCarRental, MdCheckCircle } from "react-icons/md";
import useSettings from "../../hooks/useSettingsData";

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckoutData();
  const { settings } = useSettings();
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
    <div>
      <PageHeader header={`Invoice details #${booking?.id}`} paragraph={""} />
      <section className="space-y-6">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-md ">
          <div
            className={`mb-8 ${
              booking?.status !== "paid" ? "text-red-600" : "text-green-600"
            }  rounded-md flex items-center gap-2`}
          >
            <MdCheckCircle className="w-8 h-8 " />
            <p className="text-2xl">
              {booking?.status === "paid" ? "Payment Confirmed" : "Payment not confirmed"}
            </p>
          </div>
          <div className="bg-gray-200/60 dark:bg-gray-200/10 dark:bg- w-full h-0.5 mb-8"></div>
          <div className="space-y-5">
            <div className="">
              <p className="text-gray-400 text-sm">Full name</p>
              <p className="text-lg dark:text-gray-100 text-gray-600">
                {booking?.guests?.firstName + " " + booking?.guests?.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-lg dark:text-gray-100 text-gray-600">
                {booking?.guests?.email}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Extra charges</p>
              <p className="text-lg dark:text-gray-100 text-gray-600">
                {booking?.addedGasCard ? "Gas card included" : "Gas card not included"}
              </p>
            </div>
          </div>
          {/* <footer>
            {booking && (
              <p>
                Booked on {format(new Date(booking?.checkInDate), "EEE, MMM dd yyyy, p")}
              </p>
            )}
          </footer> */}
        </div>
        <div className="bg-white dark:bg-slate-900 py-4 px-8 text-white rounded-md flex items-center gap-6 h-full">
          <img
            src={booking?.cars?.image}
            alt={`${booking?.cars.name} car`}
            className="w-24 h-24 object-contain "
          />
          <div className="border-[1px] dark:border-gray-700 border-gray-200 h-[100px] "></div>

          <div className="flex flex-col h-[100px] justify-around">
            <div className="flex gap-4 items-center">
              <MdCarRental className="w-6 h-6 text-gray-500 dark:text-gray-300 " />
              {booking && (
                <p className=" text-sm lg:text-base dark:text-gray-100 text-gray-600">
                  {booking?.cars?.name + " " + booking?.cars?.modelName}
                </p>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <MdAccessTimeFilled className="w-6 h-6 text-gray-500 dark:text-gray-300 " />
              {booking && (
                <p className="text-sm lg:text-base dark:text-gray-100 text-gray-600">
                  {format(new Date(booking?.checkInDate), "EEE, MMM dd yyyy")} (
                  {isToday(new Date(booking?.checkInDate))
                    ? "Today"
                    : formatDistanceFromNow(booking?.checkInDate)}
                  ) &mdash; {format(new Date(booking?.checkOutDate), "EEE, MMM dd yyyy")}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 py-6 px-8 rounded-md text-gray-600 text-xl">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <p className="text-gray-400">Subtotal:</p>
              <p className="text-gray-500/70">
                {formatCurrency(
                  `${booking?.totalPrice - settings?.gasCardPrice * booking?.numOfNights}`
                )}{" "}
                {booking?.addedGasCard && "(including gas card)"}
              </p>
            </div>
            <div className="flex justify-between items-center text-lg">
              <p className="text-gray-400">Gas card:</p>
              <p className="text-gray-500/70">
                {formatCurrency(`${settings?.gasCardPrice * booking?.numOfNights}`)}{" "}
                {booking?.addedGasCard &&
                  `(${formatCurrency(settings?.gasCardPrice)} x ${
                    booking?.numOfNights
                  } days)`}
              </p>
            </div>
          </div>
          <div className="bg-gray-200/60 dark:bg-gray-200/10 dark:bg- w-full h-0.5 my-6"></div>
          <div className="flex justify-between items-center ">
            <p className="text-slate-700">Total price:</p>
            <p>
              {formatCurrency(`${booking?.totalPrice}`)}{" "}
              {booking?.addedGasCard && "(including gas card)"}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 py-6 px-8 rounded-md flex items-center justify-between">
          <p className="text-slate-800 text-xl">Final Confirmation</p>
          <div>
            {booking?.status !== "not-paid" && (
              <button
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-md text-lg px-6 py-3 text-center mr-5"
                onClick={() => navigate(`/confirmation/${booking?.id}`)}
              >
                Confirm Booking
              </button>
            )}
            {booking?.status !== "paid" && (
              <button
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-md text-lg px-6 py-3 text-center "
                onClick={() => checkOut(booking?.id)}
              >
                Confirm Booking
              </button>
            )}
            {booking?.status && (
              <button
                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-md text-lg px-6 py-3 text-center "
                onClick={handleDeleteModal}
                disabled={isDeleting}
              >
                Cancel & Delete Booking
              </button>
            )}
          </div>
        </div>
        {showModal && (
          <DeleteModal
            closeModal={() => setShowModal(false)}
            deleteConfirmation={() => {
              if (booking.id) deleteBooking(booking.id);
            }}
            deleteMessage="Are you sure you want to deny reservation of this car?"
            navigateTo={() => navigate("/bookings")}
          />
        )}
        {/* <button onClick={navigateBack}>Back</button> */}
      </section>
    </div>
  );
}

export default BookingDetail;
