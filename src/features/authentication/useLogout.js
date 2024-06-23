import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Successfully logged out");
      queryClient.removeQueries();
      //   replace: logging out you will not go back to the previous page
      navigate("/login", { replace: true });
    },
    onError: () => {
    //   console.log(error);
      toast.error("There has been a problem logging out.");
    },
  });
  return { logout, isLoading };
}
