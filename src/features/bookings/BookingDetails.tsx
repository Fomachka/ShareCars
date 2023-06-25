import { HiOutlineHomeModern } from "react-icons/hi2";
import useBooking from "../../hooks/useSingleBooking";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "../../utils/helpers";
import useNavigateBack from "../../hooks/useNavigateBack";

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  // const navigateBack = useNavigateBack();
  console.log(booking);

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
          <p>Total price: ${booking?.totalPrice}</p>
          <p>Status: {booking?.isPaid ? "Paid" : "Will pay at property"}</p>
          <footer>
            {booking && (
              <p>
                Booked on {format(new Date(booking?.checkInDate), "EEE, MMM dd yyyy, p")}
              </p>
            )}
          </footer>
        </div>
        {/* <button onClick={navigateBack}>Back</button> */}
      </section>
    </div>
  );
}

export default BookingDetail;
