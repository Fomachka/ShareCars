import useBooking from "../../hooks/useSingleBooking";
import { format, isToday } from "date-fns";
import { formatPrice, formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../../ui/modals/DeleteModal";
import useDeleteBooking from "./hooks/useDeleteBooking";
import PageHeader from "../../ui/headers/PageHeader";
import { MdAccessTimeFilled, MdCarRental, MdCheckCircle } from "react-icons/md";
import useSettings from "../../hooks/useSettingsData";
import useDetailsConfirmation from "../../hooks/useDetailsConfirmation";
import { Loading } from "../../ui/Loading";

function BookingDetail() {
  const [showModal, setShowModal] = useState(false);
  const [payConfirm, setPayConfirm] = useState(false);
  const [addGasCard, setAddGasCard] = useState(false);

  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { checkIn, isLoading: isCheckingIn } = useDetailsConfirmation();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { isLoading: isDeleting, mutate: deleteBooking } = useDeleteBooking();

  const handleCheckIn = (id: number) => {
    if (!payConfirm) {
      return;
    }

    if (addGasCard) {
      checkIn({
        id,
        extraDetails: {
          addedGasCard: true,
          extraPrice: choosesToBuyCard,
          totalPrice: booking?.totalPrice + choosesToBuyCard,
        },
      });
    } else {
      checkIn({ id, extraDetails: {} });
    }
  };

  const choosesToBuyCard = settings?.gasCardPrice * booking?.numOfNights;

  if (isLoading || isLoadingSettings) return <Loading />;

  if (!booking) {
    return (
      <div className="text-xl text-slate-700 dark:text-gray-200 xl:text-2xl flex justify-center items-center h-full">
        No bookings could be found.
      </div>
    );
  }

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
              booking?.status !== "paid"
                ? "text-red-600"
                : "text-green-600 dark:text-green-500"
            }  rounded-md flex items-center gap-4 sm:gap-2`}
          >
            <MdCheckCircle className="w-8 h-8 " />
            <p className="text-xl xsm:text-2xl">
              {booking?.status === "paid" ? "Payment Confirmed" : "Payment not confirmed"}
            </p>
          </div>
          <div className="bg-gray-200/60 dark:bg-gray-200/10 dark:bg- w-full h-0.5 mb-8"></div>
          <div className="space-y-5">
            <div className="">
              <p className="text-gray-400 text-sm">Full name</p>
              <p className="xsm:text-lg dark:text-gray-100 text-gray-600">
                {booking?.guests?.firstName + " " + booking?.guests?.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="xsm:text-lg dark:text-gray-100 text-gray-600">
                {booking?.guests?.email}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Extra charges</p>
              <p className="xsm:text-lg dark:text-gray-100 text-gray-600">
                {booking?.addedGasCard ? "Gas card included" : "Gas card not included"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 py-4 px-8 text-white rounded-md flex items-center gap-6 h-full flex-wrap">
          <img
            src={booking?.cars?.image}
            alt={`${booking?.cars.name} car`}
            className="sm:w-24 sm:h-24 object-contain"
            width={261}
            height={174}
          />
          <div className="border-[1px] dark:border-gray-700 border-gray-200 h-[100px] hidden sm:block"></div>

          <div className="flex flex-col h-[100px] justify-around">
            <div className="flex gap-4 items-center">
              <MdCarRental className="w-6 h-6 text-gray-500/90 dark:text-gray-300 hidden xsm:block" />
              {booking && (
                <p className=" text-sm lg:text-base dark:text-gray-100 text-gray-600">
                  {booking?.cars?.name + " " + booking?.cars?.modelName}
                </p>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <MdAccessTimeFilled className="w-6 h-6 text-gray-500/90  dark:text-gray-300 hidden xsm:block" />
              {booking && (
                <p className=" text-sm lg:text-base dark:text-gray-100 text-gray-600">
                  {format(new Date(booking?.checkInDate), "EEE, MMM dd yyyy")} (
                  {isToday(new Date(booking?.checkInDate))
                    ? "Today"
                    : formatDistanceFromNow(booking?.checkInDate)}
                  ) &mdash; {format(new Date(booking?.checkOutDate), "EEE, MMM dd yyyy")}
                </p>
              )}
            </div>
          </div>
          <div className="text-sm lg:text-sm dark:text-gray-400 text-gray-600 sm:ml-auto sm:self-end">
            {booking && (
              <p>
                Booked on {format(new Date(booking?.checkInDate), "EEE, MMM dd yyyy, p")}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 py-6 px-8 rounded-md text-gray-600 text-xl">
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center sm:text-lg text-base">
              <p className="text-gray-400 dark:text-gray-400/90">Subtotal:</p>
              <p className="text-gray-500/70 dark:text-gray-500">
                {formatPrice(
                  booking?.totalPrice - settings?.gasCardPrice * booking?.numOfNights
                )}{" "}
                {booking?.addedGasCard && "(including gas card)"}
              </p>
            </div>
            <div className="flex flex-wrap justify-between items-center sm:text-lg text-base">
              <p className="text-gray-400 dark:text-gray-400/90">Gas card:</p>
              <p className="text-gray-500/70 dark:text-gray-500">
                {formatPrice(settings?.gasCardPrice * booking?.numOfNights)}{" "}
                {booking?.addedGasCard &&
                  `(${formatPrice(settings?.gasCardPrice)} x ${
                    booking?.numOfNights
                  } days)`}
              </p>
            </div>
          </div>
          <div className="bg-gray-200/60 dark:bg-gray-200/10  w-full h-0.5 my-6 "></div>
          <div className="flex flex-wrap justify-between items-center text-slate-700 dark:text-gray-300 sm:text-lg text-base">
            <p>Total price:</p>
            <p>
              {formatPrice(booking?.totalPrice)}{" "}
              {booking?.addedGasCard && "(including gas card)"}
            </p>
          </div>
        </div>

        {booking?.status && booking?.status !== "paid" && (
          <div className="bg-white dark:bg-slate-900 py-6 px-8 rounded-md text-gray-600 dark:text-gray-200  space-y-4 text-sm xsm:text-base xl:text-lg">
            {!booking?.addedGasCard && (
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  checked={addGasCard}
                  id="gas"
                  onChange={() => {
                    setAddGasCard((prev: boolean) => !prev);
                    setPayConfirm(false);
                  }}
                  className="w-5 h-auto checked:bg-blue-400 checked:accent-blue-600"
                />
                <label htmlFor="gas">
                  I confirm a client wants to add an additional gas card{" "}
                  <span className=" text-gray-500">
                    ({formatPrice(settings.gasCardPrice)} x {booking?.numOfNights} days)
                  </span>
                </label>
              </div>
            )}
            <div className="flex gap-4">
              <input
                type="checkbox"
                checked={payConfirm}
                disabled={isCheckingIn}
                id="confirm"
                onChange={() => setPayConfirm((prev) => !prev)}
                className="w-5 h-auto"
              />
              <label htmlFor="confirm">
                I confirm that {booking?.guests?.firstName} has payed the total amount of{" "}
                {addGasCard ? (
                  <>
                    <span>{formatPrice(booking?.totalPrice + choosesToBuyCard)} </span>
                    <span className=" text-gray-500">
                      ({formatPrice(booking?.totalPrice)} +{" "}
                      {formatPrice(choosesToBuyCard)})
                    </span>
                  </>
                ) : (
                  formatPrice(booking?.totalPrice)
                )}
              </label>
            </div>
          </div>
        )}
        <div className="bg-white dark:bg-slate-900 py-6 px-8 rounded-md flex items-center justify-between flex-wrap">
          <p className="text-slate-800 dark:text-gray-300 sm:text-xl  text-base mb-4 md:mb-0">
            Final Confirmation
          </p>
          <div className="w-full space-y-3 sm:space-y-0 sm:w-fit">
            {booking?.status && booking?.status !== "paid" && (
              <button
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-md 2xl:text-lg px-6 py-3 text-center mr-5 w-full sm:w-fit disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
                disabled={!payConfirm || isCheckingIn}
                onClick={() => {
                  handleCheckIn(booking?.id);
                }}
              >
                Confirm Payment
              </button>
            )}
            {booking?.status && (
              <button
                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-md px-6 py-3 text-center 2xl:text-lg  w-full sm:w-fit"
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
      </section>
    </div>
  );
}

export default BookingDetail;
