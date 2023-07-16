import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import supabase from "../api/supabase";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cars } from "./data-cabins";
import { guests } from "./data-guests";
import { MdCloudUpload, MdSettings } from "react-icons/md";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cars").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCars() {
  const { error } = await supabase.from("cars").insert(cars);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase.from("guests").select("id").order("id");
  const allGuestIds = guestsIds?.map((car) => car.id);
  const { data: cabinsIds } = await supabase.from("cars").select("id").order("id");
  const allCabinIds = cabinsIds?.map((car) => car.id);

  console.log(allCabinIds, "cabins");

  console.log(bookings, "bookings");

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const car = cars.at(booking.placeId);
    const numOfNights = subtractDates(booking.checkOutDate, booking.checkInDate);
    const carPrice = car && numOfNights * car?.price;
    const extraPrice = booking.addedGasCard ? numOfNights * 60 : 0; // hardcoded breakfast price
    const totalPrice = carPrice && carPrice + extraPrice;

    let status;
    if (
      isPast(new Date(booking.checkOutDate)) &&
      !isToday(new Date(booking.checkOutDate))
    )
      status = "not-paid";
    if (isFuture(new Date(booking.checkInDate)) || isToday(new Date(booking.checkInDate)))
      status = "not-paid";
    if (
      (isFuture(new Date(booking.checkOutDate)) ||
        isToday(new Date(booking.checkOutDate))) &&
      isPast(new Date(booking.checkInDate)) &&
      !isToday(new Date(booking.checkInDate))
    )
      status = "paid";

    return {
      ...booking,
      numOfNights,
      carPrice,
      extraPrice,
      totalPrice,
      guestId: allGuestIds?.at(booking.guestId - 1),
      placeId: allCabinIds?.at(booking.placeId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

export const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    await createGuests();
    await createCars();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div className="space-y-4">
      <button
        onClick={uploadAll}
        disabled={isLoading}
        className="flex items-center gap-4 text-gray-100  py-3.5 px-4 bg-blue-500 rounded-md  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 w-full disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
      >
        <MdCloudUpload className="flex-shrink-0 w-6 h-6 transition duration-75" />
        <span className="">Upload Cars Info</span>
      </button>
      <button
        onClick={uploadBookings}
        disabled={isLoading}
        className="flex items-center gap-4 text-gray-100  py-3.5 px-4 bg-blue-500 rounded-md  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  dark:focus:ring-blue-800 w-full disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
      >
        <MdCloudUpload className="flex-shrink-0 w-6 h-6 transition duration-75" />
        <span>Upload Bookings Info</span>
      </button>
    </div>
  );
};
