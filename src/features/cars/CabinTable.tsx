import { Loading } from "../../ui/Loading";
import { SingleCar } from "./SingleCar";
import useQueryData from "../../hooks/useQueryData";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const CabinTable = () => {
  const { isLoading, cars } = useQueryData();
  const [currentMenu, setCurrentMenu] = useState(0);
  const [searchParams] = useSearchParams();

  if (isLoading) return <Loading />;

  if (!cars?.length) {
    return (
      <div className="text-slate-700 dark:text-gray-200 text-xl xl:text-2xl">
        No cars could be found.
      </div>
    );
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
    <>
      {selectedCars && selectedCars.length > 0 && (
        <h3 className="pl-2 text-sm text-gray-400 dark:text-gray-400 xl:text-base mb-4">
          Active Cars ({selectedCars.length} Cars)
        </h3>
      )}
      {selectedCars?.length === 0 && (
        <div className="text-slate-700 dark:text-gray-200 text-xl ml-1 font-medium m-10 xl:text-2xl">
          No cars were found matching the criteria ...
        </div>
      )}
      <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 auto-cols-fr gap-4">
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
    </>
  );
};
