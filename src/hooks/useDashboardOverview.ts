import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "../api/apiBookings";

const useDashboardOverview = () => {
  const { data: overview, isLoading } = useQuery({
    queryFn: getDashboardOverview,
    queryKey: ["overview"],
  });

  return { overview, isLoading };
};

export default useDashboardOverview;
