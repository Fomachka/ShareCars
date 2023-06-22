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
    setSearchParams(searchParams);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    searchParams.set("select", target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="border-1 border-gray-100 bg-white shadow-sm rounded-md p-2 flex gap-2">
        {allFilters.map((filter, index) => (
          <button
            key={index}
            className={`bg-white border-none rounded-md font-medium text-2xl py-2 px-4 transition-all hover:bg-blue-500 hover:text-white disabled:cursor-no-drop ${
              filter.value === currentlyActive && "bg-blue-500 text-white"
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
