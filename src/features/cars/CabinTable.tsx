import { Loading } from "../../ui/Loading";
import { SingleCar } from "./SingleCar";
import useQueryData from "../../hooks/useQueryData";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const CabinTable = () => {
  const { isLoading, cars } = useQueryData();
  const [currentMenu, setCurrentMenu] = useState(0);
  const [searchParams] = useSearchParams();

  if (isLoading) return <Loading />;

  if (!cars?.length) {
    return <div className="text-2xl text-gray-700">No Bookings could be found.</div>;
  }

  const filterParams = searchParams.get("type") || "all";

  let filteredCars;
  if (filterParams === "all") filteredCars = cars;
  if (filterParams === "auto") {
    filteredCars = cars?.filter((car) => car.type === "auto");
  }
  if (filterParams === "manual") {
    filteredCars = cars?.filter((car) => car.type === "manual");
  }

  const filterSelect = searchParams.get("select") || "name-asc";
  const [filterName, ascOrDesc] = filterSelect.split("-");
  const modifier = ascOrDesc === "asc" ? 1 : -1;
  console.log(filteredCars);
  let selectedCars = filteredCars?.sort(
    (a, b) => (a[filterName] - b[filterName]) * modifier
  );
  if (filterSelect.includes("name")) {
    selectedCars = filteredCars?.sort((a, b) => {
      const nameA = a[filterName].toUpperCase();
      const nameB = b[filterName].toUpperCase();

      if (nameA < nameB) {
        return -1 * modifier;
      }
      if (nameA > nameB) {
        return 1 * modifier;
      }

      return 0 * modifier;
    });
  }

  return (
    <div
      // className="border border-gray-400 text-2xl bg-white rounded-lg  overflow-auto"
      // role="table"
      className="grid 2xl:grid-cols-3 md:grid-cols-2 gap-4"
    >
      {/* <header
        className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-10 items-center bg-gray-50 border-b-1 border-gray-100 tracking-wide text-gray-600 py-6 px-10 text-base"
        role="row"
      >
        <div></div>
        <div></div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </header> */}
      {selectedCars?.map((car, index) => (
        <SingleCar
          key={index}
          index={index}
          car={car}
          setCurrentMenu={setCurrentMenu}
          currentMenu={currentMenu}
        />
      ))}
    </div>
  );
};
