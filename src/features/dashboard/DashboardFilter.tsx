import Filter from "../cars/Filter";

const DashboardFilter = () => {
  return (
    <Filter
      currentFilter="last"
      allFilters={[
        { value: "7", category: "Last 7d" },
        { value: "30", category: "Last 30d" },
        { value: "90", category: "Last 90d" },
      ]}
    />
  );
};

export default DashboardFilter;
