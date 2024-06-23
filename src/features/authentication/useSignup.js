import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (credentials) =>
      signUpApi({
        email: credentials.email,
        password: credentials.password,
        fullName: credentials.fullName,
      }),
    onSuccess: () => {
    //   console.log(user);
      toast.success(
        "Successfully signed up new user. Please verify user's email address"
      );
    },
    onError: () => {
      toast.error("There has been a problem signing up a new user");
    },
  });
  return { signup, isLoading };
}
