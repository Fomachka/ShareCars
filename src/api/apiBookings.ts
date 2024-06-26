import { AllFilters } from "../features/cars/Filter";
import { UpdatedBooking } from "../hooks/useDetailsConfirmation";
import { itemsPerPage } from "../utils/globalValues";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

interface Sort {
  sortingType: string;
  ascOrDesc: string;
}

export async function getBookings({
  filter,
  sort,
  activePage,
}: {
  filter: AllFilters | null;
  sort: Sort | null;
  activePage: number | null;
}) {
  let query = supabase
    .from("bookings")
    .select("*, cars(name),guests(firstName, lastName, email)", { count: "exact" });

  if (filter) query = query.eq(filter.value, filter.category);

  if (sort)
    query = query.order(sort.sortingType, {
      ascending: sort.ascOrDesc === "asc",
    });

  if (activePage) {
    const from = (activePage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cars(*), guests(*), settings(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsFilteredByDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getRentersFilteredByDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(firstName)")
    .gte("checkInDate", date)
    .lte("checkInDate", getToday());

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getDashboardOverview() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(firstName, lastName, email)")
    .or(
      `and(status.eq.not-paid,checkInDate.eq.${getToday()}),and(status.eq.paid,checkOutDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: UpdatedBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
