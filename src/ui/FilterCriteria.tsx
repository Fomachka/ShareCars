import { AllFilters } from "../features/cars/Filter";

export const FilterCriteria = ({
  allFilters,
  currentSelectFilter,
  onChange,
}: {
  allFilters: AllFilters[];
  currentSelectFilter: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <select
      onChange={onChange}
      className="2xl:text-lg py-3.5 px-4 sm:py-3 rounded-md bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-300/80  font-medium shadow-sm w-full sm:w-[250px] bg-[url('/images/icons/arrow-down.svg')] bg-no-repeat bg-[length:26px_26px] bg-[calc(100%-10px)] focus:outline-none text-sm xsm:text-base"
      value={currentSelectFilter}
    >
      {allFilters.map((filter, index) => (
        <option value={filter.value} key={index}>
          {filter.category}
        </option>
      ))}
    </select>
  );
};
