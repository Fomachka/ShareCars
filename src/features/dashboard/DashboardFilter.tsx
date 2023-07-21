import Filter from "../cars/Filter";

const DashboardFilter = () => {
  return (
    <Filter
      currentFilter="last"
      allFilters={[
        { value: "7", category: "7 days" },
        { value: "30", category: "30 days" },
        { value: "90", category: "90 days" },
      ]}
    />
  );
};

export default DashboardFilter;
