import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "../../../api/apiLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      Login({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard");
    },

    onError: (error) => {
      toast.error("Incorrect login credentials");
    },
  });

  return { login, isLogin };
};

export default useLogin;
