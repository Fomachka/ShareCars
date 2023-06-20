import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/apiSettings";

const useSettings = () => {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, settings, error };
};

export default useSettings;
