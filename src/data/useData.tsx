import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import supabase from "../api/supabase";
import { findDifferenceInDayss } from "../utils/helpers";
import { bookings } from "./dummy_bookings";
import { cars } from "./dummy-cars";
import { guests } from "./dummy-users";
import { MdCloudUpload } from "react-icons/md";
import { getDashboardOverview } from "../api/apiBookings";
import { useQueryClient } from "@tanstack/react-query";

async function deleteUsers() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) {
    throw new Error(error.message);
  }
}

async function deleteCars() {
  const { error } = await supabase.from("cars").delete().gt("id", 0);
  if (error) {
    throw new Error(error.message);
  }
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) {
    throw new Error(error.message);
  }
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) {
    throw new Error(error.message);
  }
}

async function createCars() {
  const { error } = await supabase.from("cars").insert(cars);
  if (error) {
    throw new Error(error.message);
  }
}

async function createBookings() {
  const { data: guestsIds } = await supabase.from("guests").select("id").order("id");
  const allGuestIds = guestsIds?.map((car) => car.id);
  const { data: cabinsIds } = await supabase.from("cars").select("id").order("id");
  const allCabinIds = cabinsIds?.map((car) => car.id);

  const finalBookings = bookings.map((booking) => {
    const car = cars.at(booking.placeId);
    const numOfNights = findDifferenceInDayss(booking.checkOutDate, booking.checkInDate);
    const carPrice = car && numOfNights * car?.price;
    const extraPrice = booking.addedGasCard ? numOfNights * 60 : 0;
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
  if (error) {
    throw new Error(error.message);
  }
}

export const UploadData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteUsers();
    await deleteCars();

    await createGuests();
    await createCars();
    await createBookings();

    queryClient.invalidateQueries(["cars"]);

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    await getDashboardOverview();

    queryClient.invalidateQueries(["overview"]);

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
