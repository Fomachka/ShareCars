import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import supabase from "../api/supabase";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { cars } from "./data-cabins";
import { guests } from "./data-guests";

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

async function createCabins() {
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
  console.log(guestsIds.length, "guests");

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

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
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
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      <h3>DEV AREA</h3>

      <button
        onClick={uploadAll}
        // To prevent accidental clicks. Remove to run once!
        disabled={isLoading}
        // disabled={true}
        className="bg-red-400 p-2"
      >
        Upload ALL sample data
      </button>
      <p>Only run this only once!</p>
      <p>
        <em>(Cabin images need to be uploaded manually)</em>
      </p>
      <hr />
      <button onClick={uploadBookings} disabled={isLoading} className="bg-red-400 p-2">
        Upload CURRENT bookings
      </button>
      <p>You can run this every day you develop the app</p>
    </div>
  );
}
