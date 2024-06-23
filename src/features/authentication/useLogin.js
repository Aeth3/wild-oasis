import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Successfully logged in");
      queryClient.setQueryData(["user"], user.user);
      // console.log(user);
      navigate("/",{replace: true});
    },
    onError: () => {
      // console.log("ERROR", error);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
}
