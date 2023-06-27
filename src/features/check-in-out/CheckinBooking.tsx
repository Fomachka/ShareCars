import { useEffect, useState } from "react";
import useBooking from "../../hooks/useSingleBooking";
import { Loading } from "../../ui/Loading";
import { useNavigate } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import useCheckinData from "../../hooks/useCheckinData";
import useSettings from "../../hooks/useSettingsData";

const CheckinBooking = () => {
  const { booking, isLoading } = useBooking();
  const [payConfirm, setPayConfirm] = useState(booking?.isPaid || false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkIn, isLoading: isCheckingIn } = useCheckinData();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const navigate = useNavigate();
  //   setPayConfirm(booking?.isPaid || false);
  //   console.log(payConfirm);
  // }, [booking]);

  const id = booking?.id;

  const handleCheckIn = () => {
    if (!payConfirm) {
      return;
    }

    if (addBreakfast) {
      checkIn({
        id,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: booking?.totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ id, breakfast: {} });
    }
  };

  const optionalBreakfastPrice =
    settings?.breakfastPrice * booking?.numOfNights * booking?.numOfGuests;

  if (isLoading || isLoadingSettings) return <Loading />;

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
            Total price: ${booking?.totalPrice}
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
        {/* Breakfast */}
        {!booking?.hasBreakfast && (
          <div className="flex gap-4">
            <input
              type="checkbox"
              checked={addBreakfast}
              id="breakfast"
              onChange={() => {
                setAddBreakfast((prev: boolean) => !prev);
                setPayConfirm(false);
              }}
              className="w-5 h-auto checked:bg-blue-400 checked:accent-blue-600"
            />
            <label className="text-2xl" htmlFor="breakfast">
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}{" "}
              <span className="text-lg text-gray-500">
                ({formatCurrency(settings.breakfastPrice)} per person *{" "}
                {booking?.numOfGuests} guests)
              </span>
            </label>
          </div>
        )}
        {/* <button onClick={navigateBack}>Back</button> */}
        <div className="flex gap-4">
          <input
            type="checkbox"
            checked={payConfirm}
            disabled={payConfirm || isCheckingIn}
            id="confirm"
            onChange={() => setPayConfirm((prev: boolean) => !prev)}
            className="w-5 h-auto checked:bg-blue-400 checked:accent-pink-600"
          />
          <label className="text-2xl" htmlFor="confirm">
            I confirm that {booking?.guests?.firstName} has payed the total amount{" "}
            {addBreakfast ? (
              <>
                <span>
                  {formatCurrency(booking?.totalPrice + optionalBreakfastPrice)}{" "}
                </span>
                <span className="text-lg text-gray-500">
                  ({formatCurrency(booking?.totalPrice)} +{" "}
                  {formatCurrency(optionalBreakfastPrice)})
                </span>
              </>
            ) : (
              formatCurrency(booking?.totalPrice)
            )}
          </label>
        </div>
        <button
          className="text-xl py-2 px-4 bg-blue-400 rounded-md text-white disabled:cursor-not-allowed"
          disabled={!payConfirm || isCheckingIn}
          onClick={handleCheckIn}
        >
          Check in booking #{booking?.id}
        </button>
      </section>
    </div>
  );
};

export default CheckinBooking;
