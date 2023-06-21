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
      className="text-2xl py-3 px-5 border rounded-md bg-white font-medium shadow-sm"
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
