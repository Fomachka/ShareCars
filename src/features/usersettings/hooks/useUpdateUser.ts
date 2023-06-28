import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUserSettings } from "../../../api/apiLogin";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      toast.success("User information successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
};

export default useUpdateUser;
