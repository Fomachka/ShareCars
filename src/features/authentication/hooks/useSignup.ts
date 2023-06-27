import { useMutation } from "@tanstack/react-query";
import { SignUp } from "../../../api/apiLogin";
import toast from "react-hot-toast";

const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: SignUp,

    onSuccess: (user) => {
      console.log(user);

      toast.success("User successfully created! Please verify your email.");
    },
  });

  return { signup, isLoading };
};

export default useSignup;
