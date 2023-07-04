import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api/apiCars";

const useQueryData = () => {
  const {
    isLoading,
    data: cars,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });
  return { isLoading, cars, error };
};

export default useQueryData;
