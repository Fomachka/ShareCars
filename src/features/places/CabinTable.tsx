import { Loading } from "../../ui/Loading";
import { CabinRow } from "./CabinRow";
import useQueryData from "../../hooks/useQueryData";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const CabinTable = () => {
  const { isLoading, places } = useQueryData();
  const [currentMenu, setCurrentMenu] = useState(0);
  const [searchParams] = useSearchParams();

  if (isLoading) return <Loading />;

  if (!places?.length) {
    return <div className="text-2xl text-gray-700">No Bookings could be found.</div>;
  }

  const filterParams = searchParams.get("discount") || "all";

  let filteredPlaces;
  if (filterParams === "all") filteredPlaces = places;
  if (filterParams === "no-discount") {
    filteredPlaces = places?.filter((place) => place.discountPrice === 0);
  }
  if (filterParams === "with-discount") {
    filteredPlaces = places?.filter((place) => place.discountPrice > 0);
  }

  const filterSelect = searchParams.get("select") || "name-asc";
  const [filterName, ascOrDesc] = filterSelect.split("-");
  const modifier = ascOrDesc === "asc" ? 1 : -1;
  const selectedPlaces = filteredPlaces?.sort(
    (a, b) => (a[filterName] - b[filterName]) * modifier
  );
  return (
    <div
      className="border border-gray-400 text-2xl bg-white rounded-lg  overflow-auto"
      role="table"
    >
      <header
        className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-10 items-center bg-gray-50 border-b-1 border-gray-100 uppercase tracking-wide font-semibold text-gray-600 py-6 px-10"
        role="row"
      >
        <div></div>
        <div>Place</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </header>
      {selectedPlaces?.map((place, index) => (
        <CabinRow
          key={index}
          index={index}
          place={place}
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
        />
      ))}
    </div>
  );
};
