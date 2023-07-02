import { AllFilters } from "../features/places/Filter";

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
      className="text-lg p-3.5  rounded-md bg-white text-slate-400 font-medium shadow-sm"
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
