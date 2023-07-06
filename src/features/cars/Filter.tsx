import { useSearchParams } from "react-router-dom";
import { FilterCriteria } from "../../ui/FilterCriteria";

export interface AllFilters {
  value: string;
  category: string;
}

export const Filter = ({
  currentFilter,
  allFilters,
  allSorting,
}: {
  currentFilter: string;
  allFilters: AllFilters[];
  allSorting: AllFilters[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentlyActive = searchParams.get(currentFilter || allFilters[0].value);
  const selectFilterActive = searchParams.get("select") || "";

  const handleClick = (value: string) => {
    searchParams.set(currentFilter, value);
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }

    setSearchParams(searchParams);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    searchParams.set("select", target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-6 mb-8 flex-1 flex-wrap 2xl:mb-9">
      <div className="bg-white dark:bg-slate-900 shadow-sm rounded-md py-2 px-3 flex gap-2 justify-evenly flex-1 md:flex-none text-sm xsm:text-base">
        {allFilters.map((filter, index) => (
          <button
            key={index}
            className={`border-none rounded-md font-semi 2xl:text-lg py-1 px-4 transition-all text-slate-400 dark:text-slate-300/80 hover:bg-blue-700 dark:hover:bg-blue-600 hover:text-white dark:hover:text-slate-100 disabled:cursor-no-drop w-full whitespace-nowrap ${
              filter.value === currentlyActive &&
              "bg-blue-700 dark:bg-blue-600 !text-white"
            }`}
            onClick={() => handleClick(filter.value)}
            disabled={filter.value === currentlyActive}
          >
            {filter.category}
          </button>
        ))}
      </div>
      <FilterCriteria
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleChange(event)}
        currentSelectFilter={selectFilterActive}
        allFilters={allSorting}
      />
    </div>
  );
};
