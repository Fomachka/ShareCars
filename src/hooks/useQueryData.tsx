import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "../services/apiPlaces";

const useQueryData = () => {
  const {
    isLoading,
    data: places,
    error,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });
  return { isLoading, places, error };
};

export default useQueryData;
